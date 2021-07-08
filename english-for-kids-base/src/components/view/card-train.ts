import Component from './view-component';

// Word card in Train-mode==========================================================================
export default class CardTrain {
  private readonly card: HTMLElement;
  private readonly cardImage: HTMLElement;
  private readonly cardWordEn: HTMLElement;
  private readonly cardWordRu: HTMLElement;
  private readonly PATH_IMAGES = 'assets/images/';
  private readonly PATH_SOUNDS = 'assets/sounds/';

  constructor(word: string, translate: string, picture: string) {
    this.card = new Component('div', 'card-train').render();
    this.cardImage = new Component('img', 'card__picture').render();
    this.cardWordEn = new Component('div', 'card-train__word-en').render();
    this.cardWordRu = new Component('div', 'card-train__word-en').render();

    this.card.id = word;
    this.cardImage.setAttribute('src', this.PATH_IMAGES + picture);
    this.cardImage.setAttribute('alt', word);
    this.cardWordEn.innerText = word;
    this.cardWordRu.innerText = translate;
  }

  // Render Train-mode card
  render(): HTMLElement {
    [
      this.cardImage,
      this.cardWordEn,
      this.cardWordRu,
    ].forEach((elem) => this.card.appendChild(elem));

    return this.card;
  }
}
