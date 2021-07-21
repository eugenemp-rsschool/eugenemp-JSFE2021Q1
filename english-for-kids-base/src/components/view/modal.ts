import Component from './view-component';
import './modal.scss';

export default class Modal {
  private readonly modalBackground: HTMLElement;
  private readonly modalElement: HTMLElement;
  private readonly modalContent: HTMLElement;

  constructor(heading: string, content: HTMLElement | string) {
    this.modalBackground = new Component('div', 'modal__bg').render();
    this.modalElement = new Component('div', 'modal').render();
    this.modalContent = new Component('div', 'modal__content').render();

    this.modalElement.innerHTML = `<div class="modal__header">
                                     <span class="modal__heading">${heading}</span>
                                   </div>`;

    if (content instanceof HTMLElement) {
      this.modalContent.appendChild(content);
    }

    if (typeof content === 'string') {
      this.modalContent.innerHTML = content;
    }
  }

  render(): HTMLElement {
    this.modalElement.appendChild(this.modalContent);
    this.modalBackground.appendChild(this.modalElement);

    return this.modalBackground;
  }
}
