import Component from './view-component';
import './btn-start.scss';

export default class BtnGameStart {
  private readonly buttonElement: HTMLElement;

  constructor() {
    this.buttonElement = new Component('button', 'game__btn-start').render();
    this.buttonElement.innerText = 'Start Game';
  }

  render(): HTMLElement {
    return this.buttonElement;
  }
}
