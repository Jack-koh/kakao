interface Events {
  $parent: HTMLElement;
  newParent: HTMLElement;
}

abstract class Events {
  abstract methods(): { [key: string]: () => void };

  update(generateTemplate: Function): void {
    generateTemplate();
    const newElements: HTMLElement[] = Array.from(this.newParent.querySelectorAll("*")); // prettier-ignore
    const prevElements:HTMLElement[] = Array.from(this.$parent.querySelectorAll("*")); // prettier-ignore

    newElements.forEach((newEl: HTMLElement, i: number) => {
      const prevEl = prevElements[i];
      const condition =
        !newEl.getAttribute("outlet") &&
        !newEl.isEqualNode(prevEl) &&
        newEl.firstChild?.nodeValue?.trim() !== "";
      if (condition) prevEl.textContent = newEl.textContent;

      if (!newEl.isEqualNode(prevEl))
        Array.from(newEl.attributes).forEach((attr) => {
          prevEl.setAttribute(attr.name, attr.value);
        });
    });
  }

  click() {
    type methods = { [key: string]: () => any } | null;
    type click = NodeListOf<Element> | null;
    let clicks: click = this.$parent.querySelectorAll("[v-onclick]");
    let methods: methods = this.methods ? this.methods() : {};
    if (!clicks.length) return;

    for (const t of clicks) {
      const target = t as HTMLElement;
      const ev = target.getAttribute("v-onclick");
      if (ev && methods[ev]) target.onclick = methods[ev];
    }
  }
}

export default Events;
