import Component from '../shared/component';
import Main from '../page/main';
import Button from '../shared/button';
import CarMgmt from '../car-mgmt/car-mgmt';
import Car from '../car/car';
import { CarObj } from '../shared/api';
import './garage.scss';

class Garage {
  private readonly mainElement: HTMLElement;

  private readonly pageGarage: HTMLElement;

  private readonly pageHeading: HTMLElement;

  private readonly carMgMt: HTMLElement;

  private readonly garageWrapper: HTMLElement;

  private readonly carAmount: HTMLElement;

  private readonly btnWrapper: HTMLElement;

  private readonly btnPrev: HTMLElement;

  private readonly btnNext: HTMLElement;

  private readonly pageNum: HTMLElement;

  private page = 1;

  constructor() {
    this.mainElement = new Main().render();
    this.pageGarage = new Component('div', ['page__garage']).render();
    this.pageHeading = new Component('h2', ['page__garage__heading']).render();
    this.pageHeading.innerText = 'Garage';

    this.carMgMt = new CarMgmt().render();
    this.garageWrapper = new Component('div', ['garage__wrapper']).render();
    this.carAmount = new Component('span', ['garage__amount']).render();
    this.carAmount.innerText = 'Cars: 6';

    this.btnWrapper = new Component('div', ['garage__btn__wrapper']).render();
    this.btnPrev = new Button('garage__btn__prev', 'Prev page').render();
    this.btnNext = new Button('garage__btn__next', 'Next page').render();
    this.pageNum = new Component('span', ['garage__page-num']).render();

    this.btnWrapper.addEventListener('click', (e) => {
      if (e.target === this.btnPrev) {
        if (this.page === 1) return;
        this.getCars(this.page -= 1);
      }
      if (e.target === this.btnNext) {
        this.getCars(this.page += 1);
      }
    });

    this.carMgMt.addEventListener('submit', (e) => {
      const createForm = this.carMgMt.querySelector('.car-mgmt__create__form');
      const createInputName = this.carMgMt.querySelector('.car-mgmt__create__input-name');
      const createInputColor = this.carMgMt.querySelector('.car-mgmt__create__input-color');
      const updateForm = this.carMgMt.querySelector('.car-mgmt__update__form');
      const updateInputName = this.carMgMt.querySelector('.car-mgmt__update__input-name');
      const updateInputColor = this.carMgMt.querySelector('.car-mgmt__update__input-color');

      if (e.target === createForm) {
        e.preventDefault();
        this.createCar({
          name: (createInputName as HTMLInputElement).value,
          color: (createInputColor as HTMLInputElement).value,
        });
      }
    });
  }

  getCars(page: number): void {
    const url = 'http://localhost:3000/garage';
    const params = `?_limit=7&_page=${page}`;

    this.garageWrapper.innerHTML = '';

    fetch(url + params)
      .then((response) => {
        this.carAmount.innerText = `Cars: ${response.headers.get('X-Total-Count')}`;
        return response.json();
      })
      .then((cars) => cars.forEach((car: CarObj) => {
        this.garageWrapper.appendChild(new Car(car.name, car.color, car.id).render());
      }));

    this.page = page;
    this.pageNum.innerText = `Page: ${this.page}`;
  }

  getCar(id: number): void {
    const url = `http://localhost:3000/garage/:${id}`;

    fetch(url)
      .then((response) => response.json())
      .then((car) => console.log(car));
  }

  createCar(data: { name: string, color: string }): void {
    const url = 'http://localhost:3000/garage';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((car) => this.getCars(1));
  }

  render():HTMLElement {
    this.getCars(this.page);

    [
      this.pageHeading,
      this.carMgMt,
      this.carAmount,
      this.garageWrapper,
    ].forEach((elem) => this.pageGarage.appendChild(elem));

    [
      this.btnPrev,
      this.pageNum,
      this.btnNext,
    ].forEach((btn) => this.btnWrapper.appendChild(btn));

    this.pageGarage.appendChild(this.btnWrapper);
    this.mainElement.appendChild(this.pageGarage);

    return this.mainElement;
  }
}

export default Garage;
