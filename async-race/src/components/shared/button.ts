import Component from './component';

class Button {
  private readonly btnElement: HTMLElement;

  constructor(btnClassName: string, btnTxt: string) {
    this.btnElement = new Component('button', [btnClassName]).render();
    this.btnElement.innerText = btnTxt;
  }

  render(): HTMLElement {
    return this.btnElement;
  }
}

export default Button;
