interface Events {
  $element: HTMLElement;
  newDom: HTMLElement;
  methods?(): { [key: string]: (arg?: any) => void };
}

abstract class Events {
  update(generateDOM: Function): void {
    generateDOM();
    const newElements: HTMLElement[] = Array.from(this.newDom.querySelectorAll("*")); // prettier-ignore
    const prevElements:HTMLElement[] = Array.from(this.$element.querySelectorAll("*")); // prettier-ignore

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

  onclick() {
    type click = NodeListOf<Element> | null;
    let clicks: click = this.$element.querySelectorAll("[v-onclick]");
    let methods = this.methods ? this.methods() : {};
    if (!clicks.length) return;

    for (const t of clicks) {
      const target = t as HTMLElement;
      const ev = target.getAttribute("v-onclick");
      if (ev && methods[ev]) target.onclick = methods[ev];
    }
  }

  onchange() {
    type click = NodeListOf<Element> | null;
    let changes: click = this.$element.querySelectorAll("[v-onchange]");
    let methods = this.methods ? this.methods() : {};
    if (!changes.length) return;

    for (const t of changes) {
      const target = t as HTMLElement;
      const ev = target.getAttribute("v-onchange");
      if (ev && methods[ev]) target.oninput = methods[ev];
    }
  }
}

export default Events;
