import Component from '../shared/component';
import Main from '../page/main';
import Button from '../shared/button';
import Winner from './winner';
import { WinnerObj } from '../shared/api';
import './winners.scss';

class Winners {
  private readonly mainElement: HTMLElement;

  private readonly pageWinners: HTMLElement;

  private readonly pageHeading: HTMLElement;

  private readonly winnersAmount: HTMLElement;

  private readonly winnersTable: HTMLElement;

  private readonly winnersTHead: HTMLElement;

  private readonly winnersTRow: HTMLElement;

  private readonly winnersNumber: HTMLElement;

  private readonly winnersCar: HTMLElement;

  private readonly winnersName: HTMLElement;

  private readonly winnersWins: HTMLElement;

  private readonly winnersTime: HTMLElement;

  private readonly btnWrapper: HTMLElement;

  private readonly btnPrev: HTMLElement;

  private readonly btnNext: HTMLElement;

  private readonly pageNum: HTMLElement;

  private page = 1;

  constructor() {
    this.mainElement = new Main().render();
    this.pageWinners = new Component('div', ['page__winners']).render();
    this.pageHeading = new Component('h2', ['page__winners__heading']).render();

    this.winnersAmount = new Component('span', ['garage__amount']).render();
    this.winnersAmount.innerText = 'Winners: 6';

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

    this.btnWrapper = new Component('div', ['winners__btn__wrapper']).render();
    this.btnPrev = new Button('winners__btn__prev', 'Prev page').render();
    this.btnNext = new Button('winners__btn__next', 'Next page').render();
    this.pageNum = new Component('span', ['winners__page-num']).render();

    this.btnWrapper.addEventListener('click', (e) => {
      if (e.target === this.btnPrev) {
        if (this.page === 1) return;
        this.getWinners(this.page -= 1);
      }
      if (e.target === this.btnNext) {
        this.getWinners(this.page += 1);
      }
    });
  }

  getWinners(page: number, pageSort = '', pageOrder = ''): void {
    const url = 'http://localhost:3000/winners';
    const params = `?_limit=7&_page=${page}`;
    const sort = `_sort=${pageSort}`;
    const order = `_order=${pageOrder}`;

    this.winnersTable.childNodes.forEach((node) => {
      if ((node as HTMLElement).classList.contains('winner__table__row')) node.remove();
    });

    fetch(url + params)
      .then((response) => {
        this.winnersAmount.innerText = `Winners: ${response.headers.get('X-Total-Count')}`;
        return response.json();
      })
      .then((winners) => winners.forEach((winner: WinnerObj) => {
        this.winnersTable.appendChild(new Winner(
          winners.indexOf(winner),
          '',
          winner.wins,
          winner.time,
        ).render());
      }));

    this.page = page;
    this.pageNum.innerText = `Page: ${this.page}`;
  }

  render():HTMLElement {
    this.getWinners(this.page);

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
      this.winnersAmount,
      this.winnersTable,
    ].forEach((elem) => this.pageWinners.appendChild(elem));

    [
      this.btnPrev,
      this.pageNum,
      this.btnNext,
    ].forEach((btn) => this.btnWrapper.appendChild(btn));

    this.pageWinners.appendChild(this.btnWrapper);
    this.mainElement.appendChild(this.pageWinners);

    return this.mainElement;
  }
}

export default Winners;
