import Component from './view-component';
import './header.scss';

export default class Header {
  private readonly headerElement: HTMLElement;
  readonly headerBtnMenu: HTMLElement;
  readonly headerBtnMode: HTMLElement;

  constructor() {
    this.headerElement = new Component('header', 'header').render();
    this.headerBtnMenu = new Component('button', 'header__btn__menu').render();
    this.headerBtnMode = new Component('input', 'header__btn__mode').render();

    this.headerBtnMode.setAttribute('type', 'checkbox');
  }

  render(): HTMLElement {
    [
      this.headerBtnMenu,
      this.headerBtnMode,
    ].forEach((btn) => this.headerElement.appendChild(btn));

    return this.headerElement;
  }
}
