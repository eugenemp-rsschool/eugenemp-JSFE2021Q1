import Component from './shared/component';
import Header from './page/header';
import Winners from './winners/winners';
import Garage from './garage/garage';
import {
  CarObj,
  getCars,
  getCar,
  createCar,
  deleteCar,
  updateCar,
  deleteWinner,
  carSwitchEngine,
} from './shared/api';
import './app.scss';

class App {
  private readonly appElement: HTMLElement;

  private readonly headElement: HTMLElement;

  private readonly winners: Winners;

  private readonly garage: Garage;

  private readonly pageWinners: HTMLElement;

  private readonly pageGarage: HTMLElement;

  constructor() {
    this.winners = new Winners();
    this.garage = new Garage();
    this.appElement = new Component('div', ['app']).render();
    this.headElement = new Header().render();

    this.pageWinners = this.winners.render();
    this.pageGarage = this.garage.render();

    this.headElement.addEventListener('click', (e) => this.switchPage(e));
    this.pageGarage.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).classList.contains('btn__remove')) {
        const carID = (e.target as HTMLElement).closest('.car__wrapper')?.id;

        if (carID) {
          this.garage.deleteCarFromServer(parseInt(carID, 10));
          this.garage.deleteWinnerFromServer(parseInt(carID, 10));
          this.winners.getWinnersFromServer();
        }
      }
    });
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
