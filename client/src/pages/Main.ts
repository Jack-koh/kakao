import { Components } from "view";
import Router from "router";

const data = {
  number: [1, 2, 3, 4, 5],
};

class Main extends Components {
  constructor() {
    super();
    console.log("Main");
  }

  template() {
    return `
      <div>
        메인페이지 입니다
        <div v-onclick="text" id="textBtn">텍스트버튼</div>
        <div id="text">${data.number.join(", ")}</div>
        ${Router.outlet()}
      </div>
    `;
  }

  methods() {
    const render = this.render.bind(this);
    return {
      text() {
        data.number.push(data.number[data.number.length - 1] + 1);
        render();
      },
    };
  }
}

export default Main;
