import Component from './shared/component';
import Header from './page/header';
import Winners from './winners/winners';
import Garage from './garage/garage';
import {
  carSwitchEngine,
  carSwitchToDrive,
} from './shared/api';
import './app.scss';
import Modal from './modal/modal';

class App {
  private readonly appElement: HTMLElement;

  private readonly headElement: HTMLElement;

  private readonly winners: Winners;

  private readonly garage: Garage;

  private readonly pageWinners: HTMLElement;

  private readonly pageGarage: HTMLElement;

  private winResult: { id: number, time: number } | null = null;

  private winExist = false;

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
        this.startStopCar(carWrapper as HTMLElement, false);
      }

      if ((e.target as HTMLElement).classList.contains('car-mgmt__btn__race')) {
        this.raceControl('race');
      }

      if ((e.target as HTMLElement).classList.contains('car-mgmt__btn__reset')) {
        this.raceControl('reset');
      }
    });
  }

  // Start/stop car=================================================================================
  startStopCar(carWrap: HTMLElement, raceFlag: boolean): void {
    const carID = carWrap?.id;
    const carTrack = carWrap?.querySelector('.car__track');
    const carElement = carWrap?.querySelector('.car');
    const btnStart = carWrap?.querySelector('.btn__start');
    const btnStop = carWrap?.querySelector('.btn__stop');

    if (carID) {
      carSwitchEngine(parseInt(carID, 10), 'started')
        .then((data) => {
          const raceTime = Math.round(data.distance / data.velocity);
          const computedDistance = Math.round(
            (carTrack as HTMLElement).getBoundingClientRect().width - 100,
          );

          this.winExist = false;

          // Animate car movement
          let isAnimEnded = false;

          function animateCar(
            { draw, duration }: {
              draw: CallableFunction,
              duration: number,
            },
          ): void {
            const start = performance.now();
            const requestId = requestAnimationFrame(function animate(time) {
              if (isAnimEnded === true) {
                cancelAnimationFrame(requestId);
                return;
              }

              let timeFraction = (time - start) / duration;

              if (timeFraction > 1) timeFraction = 1;

              const progress = timeFraction;

              draw(progress);

              if (timeFraction < 1) {
                requestAnimationFrame(animate);
              }
            });
          }

          // Reset car
          function resetCar(): void {
            carSwitchEngine(parseInt(carID, 10), 'stopped')
              .then(() => {
                isAnimEnded = true;
                (carElement as HTMLElement).style.left = '0';
                btnStart?.classList.remove('btn__start_inactive');
                btnStop?.classList.add('btn__stop_inactive');
                btnStop?.removeEventListener('click', () => resetCar());
              });
          }

          animateCar({
            duration: raceTime,
            draw(progress: number): void {
              (carElement as HTMLElement).style.left = `${progress * computedDistance}px`;
            },
          });

          // Change start/stop button state
          btnStart?.classList.add('btn__start_inactive');
          btnStop?.classList.remove('btn__stop_inactive');

          // Listen if stop button is pressed...
          btnStop?.addEventListener('click', () => resetCar());

          // Request for drive mode
          carSwitchToDrive(parseInt(carID, 10))
            .then((response) => {
              // Stop car animation if status 500 is received
              if (response.status === 500) isAnimEnded = true;

              // Spawn winner modal window
              if (response.status === 200) {
                // If race mode is active, add winner to server and spawn modal window
                if (raceFlag && !this.winExist) {
                  this.winExist = true;

                  // Collerct winner info
                  this.winResult = {
                    id: parseInt(carID, 10),
                    time: parseFloat((raceTime / 1000).toFixed(2)),
                  };
                  // Add winner to server
                  this.winners.addWinnerToServer(
                    this.winResult.id,
                    1,
                    this.winResult.time,
                  );
                  // Spawn modal window
                  const modal = new Modal('car', this.winResult.time.toString()).render();
                  this.appElement.append(modal);
                }
              }
            });
        });
    }
  }

  // Handle race controls===========================================================================
  raceControl(mode: string): void {
    const btnRace = this.pageGarage.querySelector('.car-mgmt__btn__race');
    const btnReset = this.pageGarage.querySelector('.car-mgmt__btn__reset');
    const carsWrapper = this.pageGarage.querySelector('.garage__wrapper');
    const cars = carsWrapper?.querySelectorAll('.car__wrapper');

    if (mode === 'race') {
      btnRace?.classList.add('car-mgmt__btn__race_inactive');
      btnReset?.classList.remove('car-mgmt__btn__reset_inactive');

      cars?.forEach((car) => {
        this.startStopCar(car as HTMLElement, true);
      });
    }

    if (mode === 'reset') {
      btnRace?.classList.remove('car-mgmt__btn__race_inactive');
      btnReset?.classList.add('car-mgmt__btn__reset_inactive');
      this.winResult = null;
      this.winExist = true;
      cars?.forEach((car) => {
        const btnStop = car.querySelector('.btn__stop');
        (btnStop as HTMLButtonElement).click();
      });
    }
  }

  // Switch app pages===============================================================================
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

  // Render application root========================================================================
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
