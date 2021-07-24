import Component from '../view-component';
import './cards-wrapper-admin.scss';

export default class CardsWrapperADmin {
  private readonly wrapperElement: HTMLElement;

  constructor() {
    this.wrapperElement = new Component('div', 'cards-wrapper-admin').render();
  }

  render(): HTMLElement {
    return this.wrapperElement;
  }
}
