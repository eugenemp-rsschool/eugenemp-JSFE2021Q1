import Component from './view-component';
import './main-page.scss';

export default class MainPage {
  private readonly wrapperElement: HTMLElement;

  constructor() {
    this.wrapperElement = new Component('div', 'main').render();
  }

  render(): HTMLElement {
    return this.wrapperElement;
  }
}
