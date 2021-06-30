import Button from '../shared/button';
import Component from '../shared/component';
import './modal.scss';

class Modal {
  private readonly modalBG: HTMLElement;

  private readonly modalElement: HTMLElement;

  private readonly modalBtn: HTMLElement;

  private btnPresence: boolean;

  constructor(heading: string, text: string, btn = true) {
    this.btnPresence = btn;

    this.modalBG = new Component('div', ['modal__bg']).render();
    this.modalElement = new Component('div', ['modal__wrapper']).render();
    this.modalBtn = new Button('modal__btn', 'OK').render();
    this.modalElement.innerHTML = `<div class="modal__header">
                                    <h2 class="modal__heading">${heading}</h2>
                                   </div>
                                   <div class="modal__content">
                                    <span class="modal__text">${text}</span>
                                   </div>`;

    if (btn) {
      this.modalBG.addEventListener('click', (e) => {
        if (e.target === this.modalBG || e.target === this.modalBtn) {
          this.modalBG.remove();
        }
      });
    }
  }

  render(): HTMLElement {
    const modalContent = this.modalElement.querySelector('.modal__content');
    if (this.btnPresence) modalContent?.appendChild(this.modalBtn);
    this.modalBG.appendChild(this.modalElement);

    return this.modalBG;
  }
}

export default Modal;
