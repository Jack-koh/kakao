import { Router } from "./router";

const router = new Router();

export const Link = (url: string) => {
  const { location, dispatchEvent, history } = window;
  const state = { pathname: url, previous: location.pathname };
  history.pushState(state, "", url);
  dispatchEvent(new Event("popstate"));
};

interface Outlet {
  id?: string;
  className?: string | string[];
}
export const Outlet = (args?: Outlet) => {
  const outlet = document.createElement("div");
  outlet.setAttribute("outlet", "outlet");
  if (args) {
    const { id, className } = args;
    if (id) outlet.id = id;
    if (className) {
      const isArray = Array.isArray(className);
      if (isArray) outlet.classList.add(...className);
      else outlet.classList.add(className);
    }
  }
  return outlet.outerHTML;
};

export const Route = router.routes;
