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
  node!: HTMLElement;
  abstract template(): string;

  constructor() {
    super();
    this.$parent;
    this.mount();
    this.node;
  }

  generateTemplate() {
    type Template = HTMLTemplateElement | null;
    const template: Template = document.createElement("template"); // prettier-ignore
    template.innerHTML = this.template();
    this.node = document.importNode(template, true).content.firstElementChild as HTMLElement; // prettier-ignore
  }

  mount() {
    if (!this.$parent) {
      this.generateTemplate();
      this.$parent = this.node;
    }
    this.click();
  }

  render(): HTMLElement {
    this.update();
    return this.$parent;
  }

  update(): void {
    this.generateTemplate();
    const newElements: HTMLElement[] = Array.from(this.node.querySelectorAll("*")); // prettier-ignore
    const prevElements:HTMLElement[] = Array.from(this.$parent.querySelectorAll("*")); // prettier-ignore

    newElements.forEach((newEl: HTMLElement, i: number) => {
      const prevEl = prevElements[i];
      const condition =
        !newEl.isEqualNode(prevEl) &&
        newEl.firstChild?.nodeValue?.trim() !== "";
      if (condition) prevEl.textContent = newEl.textContent;

      if (!newEl.isEqualNode(prevEl))
        Array.from(newEl.attributes).forEach((attr) => {
          prevEl.setAttribute(attr.name, attr.value);
        });
    });
  }

  destroyed() {
    console.log("destroyed");
  }
}

export default Components;
