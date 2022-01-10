import Components from "./Components";

const fetchDOM = (
  Components: { render: () => HTMLElement | null },
  root: HTMLElement | null
) => {
  if (!!(root && Components)) {
    const comp = Components.render();
    if (comp) root.insertAdjacentElement("beforeend", comp);
  }
};
export { Components, fetchDOM };
