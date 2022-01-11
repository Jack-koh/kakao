import { Components } from "view";
import Router from "router";

const data = {
  number: [1, 2, 3, 4, 5],
};

class Main extends Components {
  constructor() {
    super();
    console.log("2");
  }

  template() {
    return `
      <div>
        메인페이지 입니다
        <div v-onclick="text">텍스트버튼</div>
        <div id="text">${data.number.join(", ")}</div>
        ${Router.outlet()}
      </div>
    `;
  }

  methods() {
    return {
      text: () => {
        data.number.push(data.number[data.number.length - 1] + 1);
        this.render();
      },
    };
  }

  render() {
    return this.$parent;
  }
}

export default Main;
