import { Router } from "./router";

export const fetchDOM = (
  components: HTMLElement | HTMLElement[],
  root: HTMLElement | null
) => {
  if (root) {
    if (Array.isArray(components)) {
      components.forEach((el) => root.insertAdjacentElement("beforeend", el));
    } else root.insertAdjacentElement("beforeend", components);
  }
};

export default new Router();
