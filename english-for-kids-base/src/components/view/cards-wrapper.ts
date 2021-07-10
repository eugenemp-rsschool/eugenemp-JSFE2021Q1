import Component from './view-component';
import './cards-wrapper.scss';

export default class CardsWrapper {
  private readonly wrapperElement: HTMLElement;

  constructor() {
    this.wrapperElement = new Component('main', 'cards-wrapper').render();
  }

  render(): HTMLElement {
    return this.wrapperElement;
  }
}
