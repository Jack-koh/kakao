type Routes = {
  path: string;
  element: HTMLElement;
  children?: Routes[];
};

export class Router {
  $routes: Routes[];
  body: HTMLElement;
  root: HTMLElement | null;
  layouts: HTMLElement[];
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

  fetchDOM(
    components: HTMLElement | HTMLElement[] | null,
    root: HTMLElement | null
  ) {
    this.root = root;
    if (this.root && components) {
      if (Array.isArray(components)) {
        components.forEach((el) => {
          if (this.root) this.root.insertAdjacentElement("beforeend", el);
        });
      } else this.root.insertAdjacentElement("beforeend", components);
    }
  }

  match(children: Routes[]): HTMLElement | null {
    const { pathname } = location;
    console.log(pathname);
    for (let i = 0; i < children.length; i++) {
      const self = children[i];
      if (self.path === pathname) return self.element;
      if (self.children && pathname.includes(children[i].path)) {
        console.log("cgecj1");
        if (self.element) this.layouts.push(self.element);
        return this.match(self.children);
      }
    }
    return null;
  }

  render() {
    this.layouts = [];
    const match = this.match(this.$routes);
    console.log({
      routes: this.$routes,
      pathname: window.location.pathname,
      element: match,
      layouts: this.layouts,
      root: this.root,
    });
  }

  routes(routes: Routes[]): HTMLElement | null {
    this.$routes = routes;
    this.layouts = [];
    return this.match(this.$routes);
  }
}
