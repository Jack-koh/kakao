import { Components } from "view";
import Router from "router";

interface Main {
  $parent: HTMLElement;
}

class Main extends Components {
  constructor() {
    super();
    this.$parent = document.createElement("div");
    this.$parent.textContent = "메인페이지 입니다";
  }

  template() {
    return `
      메인페이지 입니다
      ${Router.outlet()}
    `;
  }

  render() {
    console.log("메인페이지");
    return this.$parent;
  }
}

export default Main;
