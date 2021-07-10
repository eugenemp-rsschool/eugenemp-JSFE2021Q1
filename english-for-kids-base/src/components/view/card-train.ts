import Component from './view-component';
import './card-train.scss';

// Word card in Train-mode==========================================================================
export default class CardTrain {
  private readonly cardWrapper: HTMLElement;
  private readonly cardFront: HTMLElement;
  private readonly cardBack: HTMLElement;
  private readonly cardImageFront: HTMLElement;
  private readonly cardImageBack: HTMLElement;
  private readonly cardWordEn: HTMLElement;
  private readonly cardWordRu: HTMLElement;
  private readonly cardBtnFlipFront: HTMLElement;
  private readonly PATH_IMAGES = 'assets/images/';
  private readonly PATH_SOUNDS = 'assets/sounds/';

  constructor(word: string, translate: string, picture: string) {
    this.cardWrapper = new Component('div', 'card-train').render();
    this.cardFront = new Component('div', 'card-train__front').render();
    this.cardBack = new Component('div', 'card-train__back').render();
    this.cardImageFront = new Component('div', 'card-train__picture picture__front').render();
    this.cardImageBack = new Component('div', 'card-train__picture picture__back').render();
    this.cardWordEn = new Component('div', 'card-train__word word-en').render();
    this.cardWordRu = new Component('div', 'card-train__word word-ru').render();
    this.cardBtnFlipFront = new Component('button', 'card-train__btn-flip').render();

    this.cardWrapper.id = word;
    this.cardImageFront.style.backgroundImage = `url(${this.PATH_IMAGES + picture})`;
    this.cardImageBack.style.backgroundImage = `url(${this.PATH_IMAGES + picture})`;
    this.cardImageFront.setAttribute('alt', word);
    this.cardImageBack.setAttribute('alt', word);
    this.cardBtnFlipFront.setAttribute('title', 'Flip to translation');
    this.cardWordEn.innerText = word;
    this.cardWordRu.innerText = translate;
  }

  // Render Train-mode card
  render(): HTMLElement {
    [
      this.cardImageFront,
      this.cardWordEn,
      this.cardBtnFlipFront,
    ].forEach((elem) => this.cardFront.appendChild(elem));

    [
      this.cardImageBack,
      this.cardWordRu,
    ].forEach((elem) => this.cardBack.appendChild(elem));

    [
      this.cardFront,
      this.cardBack,
    ].forEach((side) => this.cardWrapper.appendChild(side));

    return this.cardWrapper;
  }
}
