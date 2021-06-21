import Button from '../shared/button';
import Component from '../shared/component';
import './car-mgmt.scss';

class CarMgmt {
  private readonly carMgmtWrapper: HTMLElement;

  private readonly createForm: HTMLElement;

  private readonly updateForm: HTMLElement;

  private readonly createInputName: HTMLElement;

  private readonly updateInputName: HTMLElement;

  private readonly createInputColor: HTMLElement;

  private readonly updateInputColor: HTMLElement;

  private readonly createBtnSubmit: HTMLElement;

  private readonly updateBtnSubmit: HTMLElement;

  private readonly btnWrpper: HTMLElement;

  private readonly btnRace: HTMLElement;

  private readonly btnReset: HTMLElement;

  private readonly btnGenerate: HTMLElement;

  constructor() {
    this.carMgmtWrapper = new Component('div', ['car-mgmt__wrapper']).render();

    this.createForm = new Component('form', ['car-mgmt__create__form']).render();
    this.createInputName = new Component('input', ['car-mgmt__create__input-name']).render();
    this.createInputColor = new Component('input', ['car-mgmt__create__input-color']).render();
    this.createBtnSubmit = new Button('car-mgmt__create__btn__submit', 'Create').render();

    this.updateForm = new Component('form', ['car-mgmt__update__form']).render();
    this.updateInputName = new Component('input', ['car-mgmt__update__input-name']).render();
    this.updateInputColor = new Component('input', ['car-mgmt__update__input-color']).render();
    this.updateBtnSubmit = new Button('car-mgmt__update__btn__submit', 'Update').render();

    [this.createInputName, this.updateInputName].forEach((btn) => btn.setAttribute('type', 'text'));
    [this.createInputColor, this.updateInputColor].forEach((btn) => btn.setAttribute('type', 'color'));
    [this.createBtnSubmit, this.updateBtnSubmit].forEach((btn) => btn.setAttribute('type', 'submit'));

    this.btnWrpper = new Component('div', ['car-mgmt__btn__wrapper']).render();
    this.btnGenerate = new Button('car-mgmt__btn__generate', 'Generate cars').render();
    this.btnReset = new Button('car-mgmt__btn__reset', 'Reset').render();
    this.btnRace = new Button('car-mgmt__btn__race', 'Race').render();

    this.btnReset.classList.add('car-mgmt__btn__reset_inactive');

    this.updateInputName.classList.add('car-mgmt__update__input-name_inactive');
    this.updateInputColor.classList.add('car-mgmt__update__input-color_inactive');
    this.updateBtnSubmit.classList.add('car-mgmt__update__btn__submit_inactive');
    this.updateInputName.setAttribute('disabled', 'disabled');
    this.updateInputColor.setAttribute('disabled', 'disabled');
  }

  render(): HTMLElement {
    [
      this.createInputName,
      this.createInputColor,
      this.createBtnSubmit,
    ].forEach((elem) => this.createForm.appendChild(elem));
    [
      this.updateInputName,
      this.updateInputColor,
      this.updateBtnSubmit,
    ].forEach((elem) => this.updateForm.appendChild(elem));
    [
      this.btnRace,
      this.btnReset,
      this.btnGenerate,
    ].forEach((btn) => this.btnWrpper.appendChild(btn));
    [
      this.createForm,
      this.updateForm,
      this.btnWrpper,
    ].forEach((elem) => this.carMgmtWrapper.appendChild(elem));

    return this.carMgmtWrapper;
  }
}

export default CarMgmt;
