import Component from '../view-component';
import './card-category-new.scss';

export default class CardCategoryNew {
  private readonly cardElelent: HTMLElement;

  constructor() {
    this.cardElelent = new Component('div', 'card-cat-new').render();
    this.cardElelent.innerHTML = '<span class="card-cat-new__heading">Add new category</span>';
  }

  render(): HTMLElement {
    return this.cardElelent;
  }
}
