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

  private readonly results: number[] = [];

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
        this.startStopCar(carWrapper as HTMLElement, 'started', false);
      }

      if ((e.target as HTMLElement).classList.contains('btn__stop')) {
        const carWrapper = (e.target as HTMLElement).closest('.car__wrapper');
        this.startStopCar(carWrapper as HTMLElement, 'stop', false);
      }

      if ((e.target as HTMLElement).classList.contains('car-mgmt__btn__race')) {
        this.startRace();
        console.log('1');
      }

      if ((e.target as HTMLElement).classList.contains('car-mgmt__btn__reset')) {
        this.resetCars();
      }
    });
  }

  startStopCar(carWrap: HTMLElement, mode: string, raceFlag: boolean): void {
    const carID = carWrap?.id;
    const carTrack = carWrap?.querySelector('.car__track');
    const carElement = carWrap?.querySelector('.car');
    const btnStart = carWrap?.querySelector('.btn__start');
    const btnStop = carWrap?.querySelector('.btn__stop');

    if (carID && mode === 'started') {
      carSwitchEngine(parseInt(carID, 10), 'started')
        .then((data) => {
          const timeReadable = parseInt((data.distance / data.velocity / 1000).toFixed(2), 10);

          const time = Math.round(data.distance / data.velocity);
          const computedDistance = Math.round(
            (carTrack as HTMLElement).getBoundingClientRect().width - 100,
          );
          const computedSpeed = Math.round(time / 100);
          const distanceStep = computedDistance / 100;

          let passedDist = distanceStep;
          let steps = 0;

          const move = setInterval(() => {
            (carElement as HTMLElement).style.left = `${passedDist}px`;
            passedDist += distanceStep;
            steps += 1;

            if (steps === 100) clearInterval(move);
          }, computedSpeed);

          btnStart?.classList.add('btn__start_inactive');
          btnStop?.classList.remove('btn__stop_inactive');

          btnStop?.addEventListener('click', () => {
            if (move) clearInterval(move);

            (carElement as HTMLElement).style.left = '0';
            btnStart?.classList.remove('btn__start_inactive');
            btnStop?.classList.add('btn__stop_inactive');
          });

          this.results.push(time);
          if (this.results.length === this.pageGarage.querySelector('.garage__wrapper')?.children.length) {
            this.results.sort();
            setTimeout(() => alert(`Best time: ${(this.results[0] / 1000).toFixed(2)}`), this.results[0]);
          }

          carSwitchToDrive(parseInt(carID, 10))
            .then((response) => {
              console.log(response.status);
              if (response.status === 500) {
                clearInterval(move);
              }
            });
        });
    }

    if (carID && mode === 'stopped') {
      carSwitchEngine(parseInt(carID, 10), 'stopped')
        .then((data) => data);
    }
  }

  startRace(): void {
    const btnRace = this.pageGarage.querySelector('.car-mgmt__btn__race');
    const btnReset = this.pageGarage.querySelector('.car-mgmt__btn__reset');
    const carsWrapper = this.pageGarage.querySelector('.garage__wrapper');
    const cars = carsWrapper?.querySelectorAll('.car__wrapper');

    btnRace?.classList.add('car-mgmt__btn__race_inactive');
    btnReset?.classList.remove('car-mgmt__btn__reset_inactive');

    cars?.forEach((car) => {
      this.startStopCar(car as HTMLElement, 'started', true);
    });
  }

  resetCars(): void {
    const btnRace = this.pageGarage.querySelector('.car-mgmt__btn__race');
    const btnReset = this.pageGarage.querySelector('.car-mgmt__btn__reset');
    const carsWrapper = this.pageGarage.querySelector('.garage__wrapper');
    const cars = carsWrapper?.querySelectorAll('.car__wrapper');

    btnRace?.classList.remove('car-mgmt__btn__race_inactive');
    btnReset?.classList.add('car-mgmt__btn__reset_inactive');

    cars?.forEach((car) => {
      this.startStopCar(car as HTMLElement, 'stopped', true);
      const wrap = car.closest('.car__wrapper');
      const btnStop = wrap?.querySelector('.btn__stop');
      (btnStop as HTMLButtonElement).click();
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
