type Routes = {
  path: string;
  element: HTMLElement;
  children?: Routes[];
};

export class Router {
  $routes: Routes[];
  body: HTMLElement;
  root: HTMLElement | null;
  layouts: any;
  constructor() {
    this.$routes = [];
    this.root = null;
    this.layouts = [];
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

  match = (): HTMLElement | null => {
    const { pathname } = location;
    this.layouts = [];

    let el: HTMLElement | null = null;
    const rec = (routes: Routes[]): void => {
      for (let i = 0; i < routes.length; i++) {
        if (el) break;
        const { path, children, element } = routes[i];

        if (path === pathname) el = element;
        else if (children && children.length && pathname.includes(path)) {
          if (element) this.layouts.push(element);
          rec(children);
        }
      }
    };
    rec(this.$routes);
    return el;
  };

  render = async () => {
    const m = this.match();
    const l = this.layouts;
    const r = this.root;
    if (!r) throw new Error("렌더링 할 대상이 존재하지 않습니다."); // prettier-ignore
    if (m) {
      const len = l.length;
      if (len) {
        const w = l[0];
        const t: HTMLElement | null = await new Promise((resolve) => {
          setTimeout(() => resolve(w.querySelector("[outlet]")), 0);
        });
        if (!t) throw new Error("outlet이 존재하지 않거나 최상위 노드를 outlet으로 사용하지 않는지 확인해보세요."); // prettier-ignore

        const c = t.cloneNode(true) as HTMLElement | null;
        const recursive = (o: HTMLElement | null, d: number) => {
          if (d < len) {
            if (o) {
              o.innerHTML = "";
              o.appendChild(l[d + 1]?.cloneNode(true) || m);
              recursive(o.querySelector("[outlet]"), d + 1);
            } else throw new Error("outlet이 존재하지 않습니다");
          }
        };
        recursive(c, 0);
        if (c) t.replaceWith(c);
        if (!r.contains(w)) {
          r.innerHTML = "";
          r.appendChild(w);
        }
      } else {
        const o = m.querySelector("[outlet]");
        if (o) o.innerHTML = "";
        r.innerHTML = "";
        r.appendChild(m);
      }
    } else r.innerHTML = ""; // 매칭되는 URL 존재하지 않음
  };

  routes(root: HTMLElement, routes: Routes[]): HTMLElement {
    this.$routes = routes;
    this.root = root;
    this.render();
    return root;
  }
}
