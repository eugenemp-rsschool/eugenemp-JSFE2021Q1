import Component from './view-component';
import './view-app.scss';

export default class AppComponent {
  private readonly appElement: HTMLElement;

  constructor() {
    this.appElement = new Component('div', 'app').render();
  }

  render(): HTMLElement {
    return this.appElement;
  }
}
