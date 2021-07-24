import Component from '../view-component';
import './card-word-new.scss';

export default class CardWordNew {
  private readonly cardElelent: HTMLElement;

  constructor() {
    this.cardElelent = new Component('div', 'card-word-new').render();
    this.cardElelent.innerHTML = '<span class="card-word-new__heading">Add new card</span>';
  }

  render(): HTMLElement {
    return this.cardElelent;
  }
}
