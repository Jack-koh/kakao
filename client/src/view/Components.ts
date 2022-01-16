import Events from "./Events";

// function render(name: any) {
//   return function (
//     target: Object,
//     key: string | symbol,
//     descriptor: PropertyDescriptor
//   ) {
//     console.log({ target, key, descriptor });
//     return descriptor;
//   };
// }

interface State {
  [key: string]: any;
}

interface Components {
  newDom: HTMLElement;
  $element: HTMLElement;
}

abstract class Components extends Events implements Components {
  abstract template(): string;
  mounted: boolean;
  state: State;

  constructor(state?: { state: { [key: string]: any } }) {
    super();
    this.state = state?.state || {};
    this.mount();
    this.newDom;
    this.mounted = false;
  }

  generateDOM() {
    type Template = HTMLTemplateElement;
    const template: Template = document.createElement("template");
    template.innerHTML = this.template();
    this.newDom = document.importNode(template, true).content.firstElementChild as HTMLElement; // prettier-ignore
  }

  mount() {
    this.generateDOM();
    this.$element = this.newDom;
    this.onclick();
    this.onchange();
  }

  render(): HTMLElement {
    const { generateDOM, mounted, $element } = this;
    if (mounted) this.update(generateDOM.bind(this));
    else this.mounted = true;
    return $element;
  }

  destroyed() {
    console.log("destroyed");
  }

  setState = (state: State) => {
    this.state = state;
    this.render();
  };
}

export default Components;
