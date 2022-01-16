type Constructor = {new (...args: any[]): { render: () => HTMLElement; destroyed: () => void }}; // prettier-ignore
type Component = { render: () => HTMLElement; destroyed: () => void };

type Routes = {
  path: string;
  component: Constructor;
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

  match = () => {
    if (this.element) this.element.destroyed();
    this.layouts.reverse().forEach((l) => l.destroyed());
    const { pathname } = location;
    this.layouts = [];
    let el: Constructor | null = null;
    const rec = (routes: Routes[]): void => {
      for (let i = 0; i < routes.length; i++) {
        if (el) break;
        const { path, children, component } = routes[i];

        if (path === pathname) el = component;
        else if (children && children.length && pathname.includes(path)) {
          if (component) this.layouts.push(new component());
          rec(children);
        }
      }
    };
    rec(this.$routes);
    this.element = el ? new (el as Constructor)() : null;
  };

  render = async () => {
    this.match();
    const L = this.layouts.map((Comp: Component) => Comp.render());
    if (!this.root) throw new Error("렌더링 할 대상이 존재하지 않습니다."); // prettier-ignore
    if (this.element) {
      const m = this.element.render(); // router match 엘리먼트
      if (L.length) {
        // 최상위 엘리먼트 (wrapper)
        const W = L[0];
        // 최상위 엘리먼트의 outlet
        const T = await new Promise((resolve) => {
          let timer: NodeJS.Timer | null = setTimeout(() => {
            resolve(W.querySelector("[outlet]"));
            if (timer) timer = null;
          }, 0);
        });
        if (!T) throw new Error("outlet이 존재하지 않거나 최상위 노드를 outlet으로 사용하지 않는지 확인해보세요."); // prettier-ignore

        const recursive = (o: HTMLElement, d: number = 0) => {
          if (d < L.length) {
            if (o) {
              o.innerHTML = "";
              o.appendChild(L[d + 1] || m);
              recursive(o.querySelector("[outlet]") as HTMLElement, d + 1);
            } else throw new Error("outlet이 존재하지 않습니다");
          }
        };
        recursive(T as HTMLElement);
        if (!this.root.contains(W)) {
          this.root.innerHTML = "";
          this.root.appendChild(W);
        }
      } else {
        const o = m.querySelector("[outlet]");
        if (o) o.innerHTML = "";
        this.root.innerHTML = "";
        this.root.appendChild(m);
      }
    } else this.root.innerHTML = ""; // 매칭되는 URL 존재하지 않음
  };

  routes(root: HTMLElement, routes: Routes[]): HTMLElement {
    this.$routes = routes;
    this.root = root;
    this.render();
    return root;
  }
}
