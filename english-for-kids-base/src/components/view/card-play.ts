import Component from './view-component';
import './card-play.scss';

// Word card in Play-mode===========================================================================
export default class CardPlay {
  private readonly card: HTMLElement;
  private readonly cardImage: HTMLElement;
  private readonly PATH_IMAGES = 'assets/images/';

  constructor(word: string, picture: string) {
    this.card = new Component('div', 'card-play').render();
    this.cardImage = new Component('img', 'card-play__picture').render();

    this.card.id = word;
    this.cardImage.setAttribute('src', this.PATH_IMAGES + picture);
    this.cardImage.setAttribute('alt', word);
  }

  // Render Play-mode card
  render(): HTMLElement {
    this.card.appendChild(this.cardImage);

    return this.card;
  }
}
