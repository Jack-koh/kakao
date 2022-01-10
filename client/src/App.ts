import { Components } from "view";
import Router from "router";
import Main from "pages/Main";
import Chat from "pages/Chat";
import Login from "pages/Login";

class App extends Components {
  $parent: HTMLElement;
  constructor() {
    super();
    this.$parent = document.createElement("div");
    this.$parent.id = "app";
  }

  render() {
    return Router.routes(this.$parent, [
      {
        path: "/",
        element: new Login().render(),
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

export default App;
