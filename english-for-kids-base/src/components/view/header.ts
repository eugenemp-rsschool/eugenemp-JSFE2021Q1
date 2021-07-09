import Component from './view-component';
import './header.scss';

export default class Header {
  private readonly headerElement: HTMLElement;
  private readonly headerStarsBox: HTMLElement;
  readonly headerBtnMenu: HTMLElement;
  readonly headerBtnMode: HTMLElement;

  constructor() {
    this.headerElement = new Component('header', 'header').render();
    this.headerBtnMenu = new Component('button', 'header__btn__menu').render();
    this.headerStarsBox = new Component('div', 'header__stars-box').render();
    this.headerBtnMode = new Component('label', 'header__switch__mode').render();

    this.headerBtnMode.innerHTML = `<input class="header__switch__mode__input" type="checkbox">
                                    <span class="header__switch__mode__slider"></span>
                                    <span class="header__switch__mode__handle"></span>`;
  }

  render(): HTMLElement {
    [
      this.headerBtnMenu,
      this.headerStarsBox,
      this.headerBtnMode,
    ].forEach((btn) => this.headerElement.appendChild(btn));

    return this.headerElement;
  }
}
