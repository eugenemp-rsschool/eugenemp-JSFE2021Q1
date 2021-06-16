class Component {
  private readonly element: HTMLElement;

  constructor(elType: string, elClassName: string[] = []) {
    this.element = document.createElement(elType);
    elClassName.forEach((name) => this.element.classList.add(name));
  }

  render(): HTMLElement {
    return this.element;
  }
}

export default Component;
