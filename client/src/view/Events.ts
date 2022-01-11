interface Event {
  $parent: HTMLElement;
}

abstract class Event {
  abstract methods(): { [key: string]: () => void };
  constructor() {
    this.$parent;
  }

  click() {
    type methods = { [key: string]: () => any } | null;
    type click = NodeListOf<Element> | null;
    let clicks: click = this.$parent.querySelectorAll("[v-onclick]");
    let methods: methods = this.methods ? this.methods() : {};

    for (const t of clicks) {
      const target = t as HTMLElement;
      const ev = target.getAttribute("v-onclick");
      if (ev && methods[ev]) target.onclick = methods[ev];
    }

    clicks = null;
    methods = null;
  }
}

export default Event;
