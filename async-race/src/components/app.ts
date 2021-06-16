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
  }

  render(): HTMLElement {
    [
      this.headElement,
      this.pageWinners,
    ].forEach((elem) => {
      this.appElement.appendChild(elem);
    });

    return this.appElement;
  }
}

export default App;
