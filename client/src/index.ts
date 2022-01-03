import App from "./App";
import { fetchDOM } from "router";
import "./index.scss";

document.addEventListener("DOMContentLoaded", () => {
  fetchDOM(App.render(), document.getElementById("root"));
});
