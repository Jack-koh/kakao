import Router from "router";
import Main from "pages/Main";
import Chat from "pages/Chat";

interface App {
  content: HTMLElement;
}

class App implements App {
  constructor() {
    this.content = document.createElement("div");
    this.content.id = "app-content";

    const homeButton = document.createElement("div");
    homeButton.textContent = "홈버튼";
    homeButton.onclick = () => Router.link("/");

    const linkButton = document.createElement("div");
    linkButton.textContent = "메인버튼";
    linkButton.onclick = () => Router.link("/main");

    const chatButton = document.createElement("div");
    chatButton.textContent = "챗버튼";
    chatButton.onclick = () => Router.link("/chat");

    this.content.appendChild(homeButton);
    this.content.appendChild(linkButton);
    this.content.appendChild(chatButton);
  }

  render() {
    return [
      this.content,
      Router.render(
        Router.routes({ path: "/main", component: new Main().render() }),
        Router.routes({ path: "/chat", component: new Chat().render() })
      ),
    ];
  }
}

export default new App();
