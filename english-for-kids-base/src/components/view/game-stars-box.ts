import Component from './view-component';
import './game-stars-box.scss';

export default class GameStarsBox {
  private readonly wrapperElement: HTMLElement;

  constructor() {
    this.wrapperElement = new Component('div', 'game__stars-box').render();
  }

  render(): HTMLElement {
    return this.wrapperElement;
  }
}
