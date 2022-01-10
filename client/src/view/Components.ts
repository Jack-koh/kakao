import Event from "./Events";

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

abstract class Components extends Event {
  abstract render(): HTMLElement;
  abstract template(): string;

  constructor() {
    super();
    this.mount();
    this.$parent;
  }

  insertNode() {
    if (this.template) {
      let template: HTMLTemplateElement | null = document.createElement("template"); // prettier-ignore
      template.innerHTML = this.template();
      let insertNode = document.importNode(template, true).content.firstElementChild as HTMLElement; // prettier-ignore
      if (this.$parent && insertNode) this.update(insertNode);
      else this.$parent = insertNode as HTMLElement;
    }
    this.click();
  }

  mount() {
    this.insertNode();
    this.RENDER();
  }

  RENDER() {
    // 각컴포넌트 render 메서드 오버라이딩
    const render = this.render.bind(this);
    this.render = () => {
      this.insertNode();
      return render();
    };
  }

  update(newDOM: HTMLElement): void {
    const newElements: HTMLElement[] = Array.from(newDOM.querySelectorAll("*"));
    const prevElements:HTMLElement[] = Array.from(this.$parent.querySelectorAll("*")); // prettier-ignore
    newElements.forEach((newEl: HTMLElement, i: number) => {
      const prevEl = prevElements[i];
      const condition =
        !newEl.isEqualNode(prevEl) &&
        newEl.firstChild?.nodeValue?.trim() !== "";

      if (condition) prevEl.textContent = newEl.textContent;
    });
    // const curElements = Array.from(this.$parentElement.querySelectorAll("*"));
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
