import Component from './view-component';
import './btn-stats-repeat.scss';

export default class BtnStatsRepeat {
  private readonly btnElement: HTMLElement;

  constructor() {
    this.btnElement = new Component('button', 'stats__btn-repeat').render();
    this.btnElement.innerText = 'Repeat';
    this.btnElement.setAttribute('title', 'Repeat difficult words');
  }

  render(): HTMLElement {
    return this.btnElement;
  }
}
