export class View {
  constructor() {}
  update(newDOM: HTMLElement | null): void {
    console.log(newDOM);
    // const newElements = Array.from(newDOM.querySelectorAll("*"));
    // const curElements = Array.from(this.$parentElement.querySelectorAll("*"));
    // console.log(newElements);
    // newElements.forEach((newEl, i) => {
    //   const curEl = curElements[i];
    //   // 변경된 텍스트 업데이트
    //   if (
    //     !newEl.isEqualNode(curEl) &&
    //     newEl.firstChild?.nodeValue.trim() !== ""
    //   ) {
    //     curEl.textContent = newEl.textContent;
    //   }
    //   // 변경된 속성 업데이트
    //   if (!newEl.isEqualNode(curEl))
    //     Array.from(newEl.attributes).forEach((attr) =>
    //       curEl.setAttribute(attr.name, attr.value)
    //     );
    // });
  }
}

type Routes = {
  path: string;
  element: HTMLElement;
  children?: Routes[];
};

export class Router extends View {
  $routes: Routes[];
  body: HTMLElement;
  root: HTMLElement | null;
  layouts: any;
  constructor() {
    super();
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
    Components: { render: () => HTMLElement | null },
    root: HTMLElement | null
  ) {
    this.root = root;
    if (this.root && Components) {
      const comp = Components.render();
      if (comp) this.root.insertAdjacentElement("beforeend", comp);
    }
  }

  outlet(target: HTMLElement) {
    target.setAttribute("outlet", "outlet");
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

  render = () => {
    const match = this.match();
    if (this.root) {
      if (match) {
        const length = this.layouts.length;
        if (length) {
          const container = this.layouts[0];
          const target = container.querySelector("[outlet]");
          if (!target)
            throw new Error(
              "최상위 노드를 outlet으로 사용하지 않는지 확인해보세요."
            );
          const clone = target.cloneNode(true);

          const recursive = (outlet: HTMLElement | null, l: number) => {
            if (l < length) {
              if (!outlet) throw new Error("outlet이 존재하지 않습니다");
              if (outlet) {
                outlet.innerHTML = "";
                outlet.appendChild(
                  this.layouts[l + 1]?.cloneNode(true) || match
                );
                recursive(outlet.querySelector("[outlet]"), l + 1);
              }
            }
          };
          recursive(clone, 0);
          target.replaceWith(clone);
          if (!this.root.contains(container)) return container;
        } else {
          const outlet = match.querySelector("[outlet]");
          if (outlet) outlet.innerHTML = "";
          this.root.firstChild?.replaceWith(match);
        }
      } else this.root.innerHTML = ""; // 매칭되는 URL 존재하지 않음
    }
    return match;
  };

  routes(routes: Routes[]): HTMLElement | null {
    this.$routes = routes;
    return this.render();
  }
}
