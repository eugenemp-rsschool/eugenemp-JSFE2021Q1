import Component from './view-component';
import './cards-wrapper.scss';

export default class CardsWrapper {
  private readonly wrapperElement: HTMLElement;

  constructor(className: string) {
    this.wrapperElement = new Component('div', `${className}`).render();
  }

  render(): HTMLElement {
    return this.wrapperElement;
  }
}
