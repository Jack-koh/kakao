export class Router {
  body: HTMLElement;
  constructor() {
    this.body = document.querySelector("body")! as HTMLElement;
    this.setPopState(); // url 변경 이벤트 등록
  }

  setPopState() {
    window.addEventListener("popstate", () => {
      console.log(window.location.pathname);
    });
  }

  routes(arg: { path: string; component: HTMLElement }) {
    return arg;
  }

  link(url: string) {
    const { location, dispatchEvent, history } = window;
    const state = { pathname: url, previous: location.pathname };
    history.pushState(state, "", url);
    dispatchEvent(new Event("popstate"));
  }

  render(...rest: { path: string; component: HTMLElement }[]) {
    console.log(rest);
    return rest[0].component;
  }
}
