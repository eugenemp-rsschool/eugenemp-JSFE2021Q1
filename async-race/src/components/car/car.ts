import Component from '../shared/component';
import Button from '../shared/button';
import createCarSVG from './car-svg';
import './car.scss';

class Car {
  private readonly carWrapper: HTMLElement;

  private readonly carHeader: HTMLElement;

  private readonly carFooter: HTMLElement;

  private readonly carTrack: HTMLElement;

  private readonly btnSelect: HTMLElement;

  private readonly btnRemove: HTMLElement;

  private readonly btnStart: HTMLElement;

  private readonly btnStop: HTMLElement;

  private readonly carMaker: HTMLElement;

  private readonly carModel: HTMLElement;

  private readonly car: HTMLElement;

  private readonly finish: HTMLElement;

  private readonly carID: number;

  constructor(maker: string, color: string, id: number, model = '') {
    this.carWrapper = new Component('div', ['car__wrapper']).render();
    this.carHeader = new Component('div', ['car__header']).render();
    this.carFooter = new Component('div', ['car__footer']).render();
    this.carTrack = new Component('div', ['car__track']).render();
    this.carMaker = new Component('span', ['car__maker']).render();
    this.carModel = new Component('span', ['car__model']).render();
    this.finish = new Component('div', ['car__finish']).render();
    this.car = new Component('div', ['car']).render();

    this.carWrapper.id = id.toString();
    this.carID = id;

    this.btnSelect = new Button('btn__select', 'Select').render();
    this.btnRemove = new Button('btn__remove', 'Remove').render();
    this.btnStart = new Button('btn__start', 'Start').render();
    this.btnStop = new Button('btn__stop', 'Stop').render();

    this.btnStop.classList.add('btn__stop_inactive');

    this.car.innerHTML = createCarSVG(color);

    this.carMaker.innerText = maker;
    this.carModel.innerText = model;
  }

  render(): HTMLElement {
    this.finish.style.backgroundImage = 'url(assets/images/car-finish.svg)';

    [
      this.btnSelect,
      this.btnRemove,
      this.carMaker,
      this.carModel,
    ].forEach((btn) => this.carHeader.appendChild(btn));

    [
      this.car,
      this.finish,
    ].forEach((elem) => this.carTrack.appendChild(elem));

    [
      this.btnStart,
      this.btnStop,
      this.carTrack,
    ].forEach((elem) => this.carFooter.appendChild(elem));

    [
      this.carHeader,
      this.carFooter,
    ].forEach((elem) => this.carWrapper.appendChild(elem));

    return this.carWrapper;
  }
}

export default Car;
