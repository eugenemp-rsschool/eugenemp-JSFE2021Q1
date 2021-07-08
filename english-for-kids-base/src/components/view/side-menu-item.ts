import Component from './view-component';
import './side-menu-item.scss';

export default class MenuItem {
  private readonly itemElement: HTMLElement;

  constructor(innerText: string) {
    this.itemElement = new Component('div', 'menu__item').render();
    this.itemElement.innerText = innerText;
  }

  render(): HTMLElement {
    return this.itemElement;
  }
}
