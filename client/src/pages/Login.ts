import { Components } from "view";
import { Link, Outlet } from "router";

class Login extends Components {
  constructor() {
    super({
      state: {
        name: "Jack",
      },
    });
  }

  template() {
    return `
      <div id="app-content">
        <div id="button" v-onclick="home">홈버튼</div>
        <div v-onclick="main">메인버튼</div>
        <div v-onclick="chat">쳇버튼</div>
        ${Outlet()}
      </div>
    `;
  }

  methods() {
    return {
      home: () => Link("/"),
      main: () => Link("/main"),
      chat: () => Link("/main/chat"),
    };
  }
}

export default Login;
