import Component from '../shared/component';
import Button from '../shared/button';
import './header.scss';

class Header {
  private readonly headElement: HTMLElement;

  private readonly btnWinners: HTMLElement;

  private readonly btnGarage: HTMLElement;

  constructor() {
    this.headElement = new Component('header', ['header']).render();
    this.btnWinners = new Button('btn__winners', 'To winners').render();
    this.btnGarage = new Button('btn__garage', 'To garage').render();
  }

  render(): HTMLElement {
    [this.btnGarage, this.btnWinners].forEach((btn) => {
      this.headElement.appendChild(btn);
    });

    return this.headElement;
  }
}

export default Header;
