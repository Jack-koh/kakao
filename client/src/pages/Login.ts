import { Components } from "view";
import Router from "router";

class Login extends Components {
  constructor() {
    super();
    console.log("1");
  }

  template() {
    return `
      <div id="app-content">
        <div id="button" v-onclick="home">홈버튼</div>
        <div v-onclick="main">메인버튼</div>
        <div v-onclick="chat">쳇버튼</div>
        ${Router.outlet()}
      </div>
    `;
  }

  methods() {
    return {
      home: Router.link.bind(this, "/"),
      main: Router.link.bind(this, "/main"),
      chat: Router.link.bind(this, "/main/chat"),
    };
  }

  render() {
    return this.$parent;
  }
}

export default Login;
