type Handlers = {
  [K in keyof HTMLElementEventMap]?: (event: HTMLElementEventMap[K]) => void;
};

export interface ElProps {
  id?: string;
  class?: string;
  text?: string;
  attrs?: Record<string, string>;
  dataset?: Record<string, string>;
  on?: Handlers;
}

export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  prop: ElProps = {},
  children: (Node | string)[] = []
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (prop.id) node.id = prop.id;
  if (prop.class) node.className = prop.class;
  if (prop.text !== undefined) node.textContent = prop.text;
  if (prop.attrs)
    Object.entries(prop.attrs).forEach(([a, v]) => node.setAttribute(a, v));
  if (prop.dataset) Object.assign(node.dataset, prop.dataset);
  if (prop.on)
    Object.entries(prop.on).forEach(([h, v]) =>
      node.addEventListener(h, v as EventListener)
    );
  node.append(...children);

  return node;
}
