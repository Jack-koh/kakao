import { Components } from "view";
import { Outlet } from "router";

export class Main extends Components {
  constructor() {
    super({
      state: {
        data: {
          number: [1, 2, 3, 4, 5],
        },
      },
    });
  }

  template() {
    return `
      <div>
        메인페이지 입니다
        <div v-onclick="text" id="textBtn">텍스트버튼</div>
        <div id="text">${this.state.data.number.join(", ")}</div>
        ${Outlet()}
      </div>
    `;
  }

  methods() {
    const { state, setState } = this;
    return {
      text() {
        const { number } = state.data;
        number.push(number[number.length - 1] + 1);
        setState(state);
      },
    };
  }
}
