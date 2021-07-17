import Component from './view-component';
import './btn-login.scss';

export default class BtnLogin {
  private readonly btnMenu: HTMLElement;

  constructor() {
    this.btnMenu = new Component('button', 'menu__btn-login').render();
    this.btnMenu.innerText = 'Login';
  }

  render(): HTMLElement {
    return this.btnMenu;
  }
}
