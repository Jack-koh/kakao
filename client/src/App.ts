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
    chatButton.onclick = () => Router.link("/main/chat");

    this.content.appendChild(homeButton);
    this.content.appendChild(linkButton);
    this.content.appendChild(chatButton);
  }

  render() {
    return Router.routes([
      {
        path: "/",
        element: this.content,
      },
      {
        path: "/main",
        element: new Main().render(),
        children: [
          {
            path: "/main/chat",
            element: new Chat().render(),
          },
        ],
      },
    ]);
    // Router.routes({ path: "/main", component: this.content }),
    //   Router.routes({ path: "/chat", component: new Chat().render() });
  }
}

export default new App();
