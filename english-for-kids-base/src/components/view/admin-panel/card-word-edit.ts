import Component from '../view-component';
import './card-word-edit.scss';

export default class CardWordEdit {
  private readonly cardElelent: HTMLElement;

  constructor(word: string, transl: string) {
    this.cardElelent = new Component('div', 'card-word-edit').render();
    this.cardElelent.innerHTML = `<div class="card-word-edit__input__wrapper">
                                    <span class="card-word-edit__label">Word: </span>
                                    <input type="text" value="${word}" class="card-word-edit__input-word">
                                  </div>

                                  <div class="card-word-edit__input__wrapper">
                                    <span class="card-word-edit__label">Translation: </span>
                                    <input type="text" value="${transl}" class="card-word-edit__input-transl">
                                  </div>

                                  <span class="card-word-edit__text">Sound:</span>
                                  <div class="card-word-edit__file__wrapper">
                                    <input id="input-sound" type="file" class="card-word-edit__input">
                                    <button class="card-word-edit__btn-select">Select file</button>
                                  </div>

                                  <span class="card-word-edit__text">Image:</span>
                                  <div class="card-word-edit__file__wrapper">
                                    <input id="input-image" type="file" class="card-word-edit__input">
                                    <button class="card-word-edit__btn-select">Select file</button>
                                  </div>

                                  <button class="card-word-edit__btn-delete"></button>
                                  <button class="card-word-edit__btn-cancel">Cancel</button>`;
  }

  render(): HTMLElement {
    return this.cardElelent;
  }
}
