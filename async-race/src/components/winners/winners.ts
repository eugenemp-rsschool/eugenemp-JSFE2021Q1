import Component from '../shared/component';
import Main from '../page/main';
import './winners.scss';

class Winners {
  private readonly mainElement: HTMLElement;

  private readonly pageWinners: HTMLElement;

  private readonly pageHeading: HTMLElement;

  private readonly winnersTable: HTMLElement;

  private readonly winnersTHead: HTMLElement;

  private readonly winnersTRow: HTMLElement;

  private readonly winnersNumber: HTMLElement;

  private readonly winnersCar: HTMLElement;

  private readonly winnersName: HTMLElement;

  private readonly winnersWins: HTMLElement;

  private readonly winnersTime: HTMLElement;

  constructor() {
    this.mainElement = new Main().render();
    this.pageWinners = new Component('div', ['page__winners']).render();
    this.pageHeading = new Component('h2', ['page__winners__heading']).render();
    this.pageHeading.innerText = 'Winners';

    this.winnersTable = new Component('table', ['winners__table']).render();
    this.winnersTHead = new Component('thead', ['winners__table__head']).render();
    this.winnersTRow = new Component('tr', ['winners__table__row']).render();

    this.winnersNumber = new Component('th', ['winners__table__header__num']).render();
    this.winnersNumber.innerText = 'Number';
    this.winnersCar = new Component('th', ['winners__table__header__car']).render();
    this.winnersCar.innerText = 'Car';
    this.winnersName = new Component('th', ['winners__table__header__name']).render();
    this.winnersName.innerText = 'Name';
    this.winnersWins = new Component('th', ['winners__table__header__wins']).render();
    this.winnersWins.innerText = 'Wins';
    this.winnersTime = new Component('th', ['winners__table__header__time']).render();
    this.winnersTime.innerText = 'Best time (seconds)';
  }

  render():HTMLElement {
    [
      this.winnersNumber,
      this.winnersCar,
      this.winnersName,
      this.winnersWins,
      this.winnersTime,
    ].forEach((elem) => this.winnersTRow.appendChild(elem));

    this.winnersTHead.appendChild(this.winnersTRow);
    this.winnersTable.appendChild(this.winnersTHead);
    [
      this.pageHeading,
      this.winnersTable,
    ].forEach((elem) => this.pageWinners.appendChild(elem));

    this.mainElement.appendChild(this.pageWinners);

    return this.mainElement;
  }
}

export default Winners;
