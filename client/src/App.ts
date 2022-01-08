import Router from "router";
import Main from "pages/Main";
import Chat from "pages/Chat";
import Content from "pages/Content";
import { Components } from "utils";

class App extends Components {
  render() {
    return Router.routes([
      {
        path: "/",
        element: new Content().render(),
      },
      {
        path: "/main",
        element: new Main().render(),
      },
      {
        path: "/chat",
        element: new Chat().render(),
      },
    ]);
  }
}

export default new App();
