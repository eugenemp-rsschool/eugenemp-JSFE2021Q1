import Component from '../shared/component';
import './winner.scss';

class Winner {
  private readonly winnerTRow: HTMLElement;

  private readonly winnerNumber: HTMLElement;

  private readonly winnerCar: HTMLElement;

  private readonly winnerName: HTMLElement;

  private readonly winnerWins: HTMLElement;

  private readonly winnerTime: HTMLElement;

  constructor(id: number, name: string, wins: number, time: number, color: string) {
    this.winnerTRow = new Component('tr', ['winner__table__row']).render();
    this.winnerNumber = new Component('td', ['winner__table__number']).render();
    this.winnerNumber.innerText = id.toString();
    this.winnerCar = new Component('td', ['winner__table__car']).render();
    this.winnerCar.style.backgroundColor = color;
    this.winnerName = new Component('td', ['winner__table__name']).render();
    this.winnerName.innerText = name;
    this.winnerWins = new Component('td', ['winner__table__wins']).render();
    this.winnerWins.innerText = wins.toString();
    this.winnerTime = new Component('td', ['winner__table__time']).render();
    this.winnerTime.innerText = time.toString();
  }

  render(): HTMLElement {
    [
      this.winnerNumber,
      this.winnerCar,
      this.winnerName,
      this.winnerWins,
      this.winnerTime,
    ].forEach((td) => this.winnerTRow.appendChild(td));

    return this.winnerTRow;
  }
}

export default Winner;
