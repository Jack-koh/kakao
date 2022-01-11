type Component = {
  new (...args: any[]): { render: () => HTMLElement; destroyed: () => void };
};

type Routes = {
  path: string;
  component: Component;
  children?: Routes[];
};

export class Router {
  $routes: Routes[];
  body: HTMLElement;
  root: HTMLElement | null;
  element: Component | null;
  layouts: Component[];
  constructor() {
    this.$routes = [];
    this.root = null;
    this.layouts = [];
    this.element = null;
    this.body = document.querySelector("body")! as HTMLElement;

    // url 변경 이벤트 등록
    window.addEventListener("popstate", this.render.bind(this));
  }

  link(url: string) {
    const { location, dispatchEvent, history } = window;
    const state = { pathname: url, previous: location.pathname };
    history.pushState(state, "", url);
    dispatchEvent(new Event("popstate"));
  }

  outlet(args?: { id?: string; className?: string | string[] }) {
    const outlet = document.createElement("div");
    outlet.setAttribute("outlet", "outlet");
    if (args) {
      const { id, className } = args;
      if (id) outlet.id = id;
      if (className) {
        const isArray = Array.isArray(className);
        if (isArray) outlet.classList.add(...className);
        else outlet.classList.add(className);
      }
    }
    return outlet.outerHTML;
  }

  match = () => {
    if (this.element) new this.element().destroyed();
    this.layouts.forEach((l) => {});
    const { pathname } = location;
    this.layouts = [];
    let el: Component | null = null;
    const rec = (routes: Routes[]): void => {
      for (let i = 0; i < routes.length; i++) {
        if (el) break;
        const { path, children, component } = routes[i];

        if (path === pathname) el = component;
        else if (children && children.length && pathname.includes(path)) {
          if (component) this.layouts.push(component);
          rec(children);
        }
      }
    };
    rec(this.$routes);
    this.element = el;
  };

  render = async () => {
    this.match();
    let M = this.element;
    const L = this.layouts.map((Comp: Component) => new Comp().render());
    const R = this.root;
    if (!R) throw new Error("렌더링 할 대상이 존재하지 않습니다."); // prettier-ignore
    if (M) {
      const len = L.length;
      const m = new M().render();
      if (len) {
        const W = L[0];
        const T = await new Promise((resolve) => {
          setTimeout(() => resolve(W.querySelector("[outlet]")), 0);
        });
        if (!T) throw new Error("outlet이 존재하지 않거나 최상위 노드를 outlet으로 사용하지 않는지 확인해보세요."); // prettier-ignore

        const recursive = (o: HTMLElement, d: number = 0) => {
          if (d < len) {
            if (o) {
              o.innerHTML = "";
              o.appendChild(L[d + 1] || m);
              recursive(o.querySelector("[outlet]") as HTMLElement, d + 1);
            } else throw new Error("outlet이 존재하지 않습니다");
          }
        };
        recursive(T as HTMLElement);
        if (!R.contains(W)) {
          R.innerHTML = "";
          R.appendChild(W);
        }
      } else {
        const o = m.querySelector("[outlet]");
        if (o) o.innerHTML = "";
        R.innerHTML = "";
        R.appendChild(m);
      }
    } else R.innerHTML = ""; // 매칭되는 URL 존재하지 않음
  };

  routes(root: HTMLElement, routes: Routes[]): HTMLElement {
    this.$routes = routes;
    this.root = root;
    this.render();
    return root;
  }
}
