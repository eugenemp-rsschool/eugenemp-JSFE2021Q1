import Component from '../view-component';
import './card-word.scss';

export default class CardWord {
  private readonly cardElement: HTMLElement;
  private readonly PATH_IMAGES = 'assets/images/';

  constructor(word: string, transl: string, sndFile: string, picture: string) {
    this.cardElement = new Component('div', 'card-word').render();
    this.cardElement.innerHTML = `<span class="card-word__text">
                                    Word: <p class="card__word">${word}</p>
                                  </span>
                                  <span class="card-word__text">
                                    Translation: <p class="card__transl">${transl}</p>
                                  </span>
                                  <span class="card-word__text">Sound file: ${sndFile}</span>
                                  <span class="card-word__text">Image:</span>
                                  <div class="card-word__image"></div>
                                  <button class="card-word__btn-delete"></button>
                                  <button class="card-word__btn-change">Change</button>`;

    const imageElement = this.cardElement.querySelector('.card-word__image');
    (imageElement as HTMLElement).style.backgroundImage = `url(${this.PATH_IMAGES + picture})`;
  }

  render(): HTMLElement {
    return this.cardElement;
  }
}
