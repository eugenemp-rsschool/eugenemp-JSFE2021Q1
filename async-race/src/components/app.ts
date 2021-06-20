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
  carSwitchToDrive,
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

      if ((e.target as HTMLElement).classList.contains('btn__start')) {
        const carWrapper = (e.target as HTMLElement).closest('.car__wrapper');
        this.startStopCar(carWrapper as HTMLElement, 'started');
      }

      if ((e.target as HTMLElement).classList.contains('btn__stop')) {
        const carWrapper = (e.target as HTMLElement).closest('.car__wrapper');
        this.startStopCar(carWrapper as HTMLElement, 'stop');
      }

      if ((e.target as HTMLElement).classList.contains('car-mgmt__btn__race')) {
        this.startRace();
      }

      if ((e.target as HTMLElement).classList.contains('car-mgmt__btn__reset')) {
        this.resetCar();
      }
    });
  }

  startStopCar(carWrap: HTMLElement, mode: string): void {
    const carID = carWrap?.id;
    const carTrack = carWrap?.querySelector('.car__track');
    const carElement = carWrap?.querySelector('.car');

    if (carID && mode === 'started') {
      carSwitchEngine(parseInt(carID, 10), 'started')
        .then((data) => {
          const time = Math.round(data.distance / data.velocity);
          const timeReadable = parseInt((data.distance / data.velocity / 1000).toFixed(2), 10);
          const distance = (carTrack as HTMLElement).getBoundingClientRect().width;
          const timeStep = time / 100;
          const distanceStep = distance / 100;

          let passedDist = distanceStep;
          let steps = 0;

          const move = setInterval(() => {
            (carElement as HTMLElement).style.left = `${passedDist}px`;
            passedDist += distanceStep;
            steps += 1;
            if (steps === 90) clearInterval(move);
          }, timeStep);

          carSwitchToDrive(parseInt(carID, 10))
            .then((response) => {
              console.log(response.status);
              if (response.status === 500) {
                clearInterval(move);
              }
            });
        });
    }
  }

  startRace(): void {
    const carsWrapper = this.pageGarage.querySelector('.garage__wrapper');
  }

  resetCar(): void {
    const carsWrapper = this.pageGarage.querySelector('.garage__wrapper');
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
