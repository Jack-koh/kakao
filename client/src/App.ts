import { Components } from "view";
import Router from "router";
import * as pages from "pages";

class App extends Components {
  constructor() {
    super();
  }

  template() {
    return `<div id="app"></div>`;
  }

  render() {
    return Router.routes(this.$element, [
      {
        path: "/",
        component: pages.Login,
      },
    ]);
  }
}

export default App;
