import { Components } from "view";
import { Route } from "router";
import * as pages from "pages";

class App extends Components {
  constructor() {
    super();
  }

  template() {
    return `<div id="app"></div>`;
  }

  render() {
    return Route(this.$element, [
      {
        path: "/",
        component: pages.Login,
      },
    ]);
  }
}

export default App;
