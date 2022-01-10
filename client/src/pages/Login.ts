import { Components } from "view";
import Router from "router";

interface Login {
  // outlet: HTMLElement;
  $parent: HTMLElement;
  outlet: HTMLElement;
}

class Login extends Components {
  constructor() {
    super();
    this.$parent = document.createElement("div");
    this.$parent.id = "app-content";

    // const homeButton = document.createElement("div");
    // homeButton.textContent = "홈버튼";
    // homeButton.onclick = () => Router.link("/");

    // const linkButton = document.createElement("div");
    // linkButton.textContent = "메인버튼";
    // linkButton.onclick = () => Router.link("/main");

    // const chatButton = document.createElement("div");
    // chatButton.textContent = "챗버튼";
    // chatButton.onclick = () => Router.link("/chat");

    // this.$parent.appendChild(homeButton);
    // this.$parent.appendChild(linkButton);
    // this.$parent.appendChild(chatButton);
  }

  template() {
    return `
      <div id="home">홈버튼</div>
      <div id="main">메인버튼</div>
      <div id="chat">쳇버튼</div>
      ${Router.outlet()}
    `;
  }

  methods() {
    const homebtn = this.$parent.querySelector("#home");
    const mainbtn = this.$parent.querySelector("#main");
    const chatbtn = this.$parent.querySelector("#chat");

    // homebtn?.addEventListener("click", () => Router.link("/"));
    homebtn?.addEventListener("click", () => this.render());
    mainbtn?.addEventListener("click", () => Router.link("/main"));
    chatbtn?.addEventListener("click", () => Router.link("/chat"));
  }

  render() {
    console.log("로그인 페이지");
    return this.$parent;
  }
}

export default Login;
