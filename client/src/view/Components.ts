interface Components {
  methods?(): void;
  template?(): string;
}

function FunctionNameLogger() {
  return function (
    target: Object,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    console.log({ target, key, descriptor });
    return descriptor;
  };
}

abstract class Components {
  abstract $parent: HTMLElement;
  abstract render(): HTMLElement;
  methods?(): void;
  template?(): string;

  constructor() {
    let timer: NodeJS.Timeout | null = setTimeout(() => {
      this.mount();
      if (timer) clearTimeout(timer);
    }, 0);
    timer = null;
  }

  mount() {
    if (this.template) {
      this.$parent.innerHTML = this.template();
      if (this.methods) this.methods();
      this.renderOverride();
    }
  }

  renderOverride() {
    // 각컴포넌트 render 메서드 오버라이딩
    const render = this.render.bind(this);
    this.render = () => {
      if (this.template) this.$parent.innerHTML = this.template();
      if (this.methods) this.methods();
      const replaceNode = this.$parent.parentNode;
      return render();
    };
  }

  update(newDOM: HTMLElement | null): void {
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

export default Components;
