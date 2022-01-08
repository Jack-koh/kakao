import Router from "router";

interface Content {
  $parent: HTMLElement;
  outlet: HTMLElement;
}

class Content {
  constructor() {
    this.$parent = document.createElement("div");
    this.$parent.id = "app-content";
    this.outlet = document.createElement("div");
    this.outlet.id = "content-outlet";

    const homeButton = document.createElement("div");
    homeButton.textContent = "홈버튼";
    homeButton.onclick = () => Router.link("/");

    const linkButton = document.createElement("div");
    linkButton.textContent = "메인버튼";
    linkButton.onclick = () => Router.link("/main");

    const chatButton = document.createElement("div");
    chatButton.textContent = "챗버튼";
    chatButton.onclick = () => Router.link("/main/chat");

    this.$parent.appendChild(homeButton);
    this.$parent.appendChild(linkButton);
    this.$parent.appendChild(chatButton);
    this.$parent.appendChild(this.outlet);

    Router.outlet(this.outlet);
  }

  render() {
    return this.$parent;
  }
}

export default Content;
