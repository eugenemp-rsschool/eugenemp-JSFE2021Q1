import Component from '../view-component';
import './header-admin.scss';

export default class HeaderAdmin {
  private readonly headerElement: HTMLElement;

  constructor() {
    this.headerElement = new Component('header', 'header-admin').render();
    this.headerElement.innerHTML = `<div class="header-admin__btn__wrapper">
                                      <button class="header-admin__btn-cats">Categories</button>
                                      <button class="header-admin__btn-words">Words</button>
                                    </div>
                                    <button class="header-admin__btn-logout">Logout</button>`;
  }

  render(): HTMLElement {
    return this.headerElement;
  }
}
