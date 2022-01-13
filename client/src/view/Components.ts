import Events from "./Events";

function render(name: any) {
  console.log(name);
  return function (
    target: Object,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    console.log({ target, key, descriptor });
    return descriptor;
  };
}

interface State {
  [key: string]: any;
}

interface Components {
  newParent: HTMLElement;
  $parent: HTMLElement;
}

abstract class Components extends Events implements Components {
  abstract template(): string;
  abstract methods(): { [key: string]: () => any };
  mounted: boolean;
  state: State;

  constructor(state?: { state: { [key: string]: any } }) {
    super();
    this.state = state?.state || {};
    this.mount();
    this.newParent;
    this.mounted = false;
  }

  generateTemplate() {
    type Template = HTMLTemplateElement | null;
    const template: Template = document.createElement("template"); // prettier-ignore
    template.innerHTML = this.template();
    this.newParent = document.importNode(template, true).content.firstElementChild as HTMLElement; // prettier-ignore
  }

  mount() {
    this.generateTemplate();
    this.$parent = this.newParent;
    this.click();
  }

  render(): HTMLElement {
    if (this.mounted) this.update(this.generateTemplate.bind(this));
    else this.mounted = true;
    return this.$parent;
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
