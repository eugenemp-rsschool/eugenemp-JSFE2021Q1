import Component from './shared/component';
import Header from './page/header';
import Winners from './winners/winners';
import Garage from './garage/garage';
import './app.scss';

class App {
  private readonly appElement: HTMLElement;

  private readonly headElement: HTMLElement;

  private readonly pageWinners: HTMLElement;

  private readonly pageGarage: HTMLElement;

  constructor() {
    this.appElement = new Component('div', ['app']).render();
    this.headElement = new Header().render();
    this.pageWinners = new Winners().render();
    this.pageGarage = new Garage().render();

    this.headElement.addEventListener('click', (e) => this.switchPage(e));
  }

  switchPage(e: Event): void {
    const btnGarage = this.headElement.querySelector('.btn__garage');
    const btnWinners = this.headElement.querySelector('.btn__winners');

    if (e.target === btnGarage) {
      this.pageWinners.remove();
      this.appElement.appendChild(this.pageGarage);
    }
    if (e.target === btnWinners) {
      this.pageGarage.remove();
      this.appElement.appendChild(this.pageWinners);
    }
  }

  render(): HTMLElement {
    [
      this.headElement,
      this.pageGarage,
    ].forEach((elem) => {
      this.appElement.appendChild(elem);
    });

    return this.appElement;
  }
}

export default App;
