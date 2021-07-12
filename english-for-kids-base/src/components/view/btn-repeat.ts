import Component from './view-component';
import './btn-repeat.scss';

export default class BtnRepeat {
  private readonly buttonElement: HTMLElement;

  constructor() {
    this.buttonElement = new Component('button', 'game__btn-repeat').render();
  }

  render(): HTMLElement {
    return this.buttonElement;
  }
}
