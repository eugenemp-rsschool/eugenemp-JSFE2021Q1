import Component from '../shared/component';
import Main from '../page/main';
import CarMgmt from '../car-mgmt/car-mgmt';
import Car from '../car/car';
import './garage.scss';

class Garage {
  private readonly mainElement: HTMLElement;

  private readonly pageGarage: HTMLElement;

  private readonly pageHeading: HTMLElement;

  private readonly carMgMt: HTMLElement;

  private readonly garageWrapper: HTMLElement;

  constructor() {
    this.mainElement = new Main().render();
    this.pageGarage = new Component('div', ['page__garage']).render();
    this.pageHeading = new Component('h2', ['page__garage__heading']).render();
    this.pageHeading.innerText = 'Garage';

    this.carMgMt = new CarMgmt().render();

    this.garageWrapper = new Component('div', ['garage__wrapper']).render();
  }

  render():HTMLElement {
    this.pageGarage.appendChild(this.pageHeading);
    this.pageGarage.appendChild(this.carMgMt);

    [
      new Car('Peugeot', '#345678', 1).render(),
      new Car('Peugeot', '#345678', 1).render(),
      new Car('Peugeot', '#345678', 1).render(),
    ].forEach((car) => this.garageWrapper.appendChild(car));

    this.pageGarage.appendChild(this.garageWrapper);
    this.mainElement.appendChild(this.pageGarage);

    return this.mainElement;
  }
}

export default Garage;
