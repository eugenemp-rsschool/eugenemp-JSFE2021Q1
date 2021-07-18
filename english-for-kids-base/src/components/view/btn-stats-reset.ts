import Component from './view-component';
import './btn-stats-reset.scss';

export default class BtnStatsReset {
  private readonly btnElement: HTMLElement;

  constructor() {
    this.btnElement = new Component('button', 'stats__btn-reset').render();
    this.btnElement.innerText = 'Reset';
    this.btnElement.setAttribute('title', 'Reset statistics');
  }

  render(): HTMLElement {
    return this.btnElement;
  }
}
