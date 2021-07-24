import Component from '../view-component';
import './card-category.scss';

export default class CardCategory {
  private readonly cardElement: HTMLElement;

  constructor(name: string, count: number) {
    this.cardElement = new Component('div', 'card-cat').render();
    this.cardElement.innerHTML = `<span class="card-cat__heading">${name}</span>
                                  <input type="text" class="card-cat__input">
                                  <span class="card-cat__count">Words: ${count}</span>
                                  <button class="card-cat__btn-delete" title="Delete category"></button>
                                  <div class="card-cat__btn__wrapper">
                                    <button class="card-cat__btn-update">Update</button>
                                    <button class="card-cat__btn-add">Add word</button>
                                  </div>`;
  }

  render(): HTMLElement {
    return this.cardElement;
  }
}
