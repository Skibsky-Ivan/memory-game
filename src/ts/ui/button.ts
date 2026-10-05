export function createButton(id: string, text: string): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.classList.add('btn');
  btn.type = 'button';
  btn.id = id;
  btn.textContent = text;
  return btn;
}