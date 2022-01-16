import { Components } from "view";
import { Route } from "router";
import Main from "pages/Main";
import Chat from "pages/Chat";
import Login from "pages/Login";

class App extends Components {
  constructor() {
    super();
  }

  template() {
    return `<div id="app"></div>`;
  }

  methods() {
    return {};
  }

  render() {
    return Route(this.$parent, [
      {
        path: "/",
        component: Login,
        children: [
          {
            path: "/main",
            component: Main,
          },
          {
            path: "/main/chat",
            component: Chat,
          },
        ],
      },
    ]);
  }
}

export default App;
