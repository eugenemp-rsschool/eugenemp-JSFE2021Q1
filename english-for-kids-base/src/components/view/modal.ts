import Component from './view-component';
import './modal.scss';

export default class Modal {
  private readonly modalElement: HTMLElement;

  constructor(heading: string, text: string) {
    this.modalElement = new Component('div', 'modal').render();
    this.modalElement.innerHTML = `<div class="modal__header">
                                     <span class="modal__heading">${heading}</span>
                                   </div>
                                   <div class="modal__content">
                                     <span class="modal__text">${text}</span>
                                   </div>`;
  }

  render(): HTMLElement {
    return this.modalElement;
  }
}
