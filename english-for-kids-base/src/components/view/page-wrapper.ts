import Component from './view-component';
import './page-wrapper.scss';

export default class PageWrapper {
  private readonly wrapperElement: HTMLElement;

  constructor() {
    this.wrapperElement = new Component('main', 'page-wrapper page-wrapper_transition').render();
  }

  render(): HTMLElement {
    return this.wrapperElement;
  }
}
