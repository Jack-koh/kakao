import App from "./App";
import Router from "router";
import "./index.scss";

document.addEventListener("DOMContentLoaded", () => {
  Router.fetchDOM(App, document.getElementById("root"));
});
