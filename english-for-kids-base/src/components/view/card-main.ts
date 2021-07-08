import Component from './view-component';
import './card-main.scss';

// Category card for main page======================================================================
export default class CardMain {
  private readonly card: HTMLElement;
  private readonly cardImage: HTMLElement;
  private readonly cardName: HTMLElement;
  private readonly PATH_IMAGES = 'assets/images/';

  constructor(name: string, picture: string) {
    this.card = new Component('div', 'card-main').render();
    this.cardImage = new Component('div', 'card-main__picture').render();
    this.cardName = new Component('div', 'card-main__name').render();

    this.card.id = name;
    this.cardImage.style.backgroundImage = `url(${this.PATH_IMAGES + picture})`;
    this.cardImage.setAttribute('alt', name);
    this.cardName.innerText = name;
  }

  // Render category card
  render(): HTMLElement {
    [
      this.cardImage,
      this.cardName,
    ].forEach((elem) => this.card.appendChild(elem));

    return this.card;
  }
}
