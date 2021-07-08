import Component from './view-component';
import './side-menu.scss';

export default class Menu {
  private readonly menuElement: HTMLElement;

  constructor() {
    this.menuElement = new Component('div', 'menu').render();
  }

  render(): HTMLElement {
    return this.menuElement;
  }
}
