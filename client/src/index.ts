import App from "./App";
import { fetchDOM } from "view";
import "./index.scss";

document.addEventListener("DOMContentLoaded", () => {
  fetchDOM(new App(), document.getElementById("root"));
});
