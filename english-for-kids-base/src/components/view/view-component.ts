export default class Component {
  private readonly element: HTMLElement;

  constructor(tagName: string, className: string) {
    this.element = document.createElement(tagName);
    this.element.className = className;
  }

  render(): HTMLElement {
    return this.element;
  }
}
