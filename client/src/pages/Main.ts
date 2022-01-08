import { Components } from "utils";
import Router from "router";

interface Main {
  $parent: HTMLElement;
  outlet: HTMLElement;
}

class Main extends Components {
  constructor() {
    super();
    this.$parent = document.createElement("div");
    this.$parent.textContent = "메인페이지 입니다";
    this.outlet = document.createElement("div");
    this.outlet.id = "main-outlet";
    this.$parent.appendChild(this.outlet);

    Router.outlet(this.outlet);
  }

  render() {
    console.log("메인페이지");
    return this.$parent;
  }
}

export default Main;
