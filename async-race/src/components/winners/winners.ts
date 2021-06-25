import Component from '../shared/component';
import Main from '../page/main';
import Button from '../shared/button';
import Winner from '../winner/winner';
import {
  WinnerObj,
  getWinners,
  getWinner,
  createWinner,
  deleteWinner,
  updateWinner,
  getCar,
  getWinnersCount,
  getAllWinners,
} from '../shared/api';
import './winners.scss';

class Winners {
  private readonly mainElement: HTMLElement;

  private readonly bgImage: HTMLElement;

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

  private readonly btnWrapper: HTMLElement;

  private readonly btnPrev: HTMLElement;

  private readonly btnNext: HTMLElement;

  private readonly pageNum: HTMLElement;

  private sortOrder = 'ASC';

  private page = 1;

  private pagesAmount = 1;

  constructor() {
    this.mainElement = new Main().render();
    this.bgImage = new Component('img', ['page__bg']).render();
    this.bgImage.setAttribute('src', 'assets/images/bg-winners-1920.jpg');

    this.pageWinners = new Component('div', ['page__winners']).render();
    this.pageHeading = new Component('h2', ['page__winners__heading']).render();
    this.pageHeading.innerText = 'Winners(0)';

    this.btnWrapper = new Component('div', ['winners__btn__wrapper']).render();
    this.btnPrev = new Button('winners__btn__prev', 'Prev page').render();
    this.btnNext = new Button('winners__btn__next', 'Next page').render();
    this.pageNum = new Component('span', ['winners__page-num']).render();

    this.winnersTable = new Component('table', ['winners__table']).render();
    this.winnersTHead = new Component('thead', ['winners__table__head']).render();
    this.winnersTRow = new Component('tr', ['winners__table__row']).render();

    this.winnersNumber = new Component('th', ['winners__table__header__num']).render();
    this.winnersNumber.innerText = 'Number';
    this.winnersCar = new Component('th', ['winners__table__header__car']).render();
    this.winnersCar.innerText = 'Car color';
    this.winnersName = new Component('th', ['winners__table__header__name']).render();
    this.winnersName.innerText = 'Name';
    this.winnersWins = new Component('th', ['winners__table__header__wins']).render();
    this.winnersWins.innerText = 'Wins';
    this.winnersTime = new Component('th', ['winners__table__header__time']).render();
    this.winnersTime.innerText = 'Best time (seconds)';

    this.pageWinners.addEventListener('click', (e) => {
      if (e.target === this.winnersNumber
       || e.target === this.winnersWins
       || e.target === this.winnersTime) {
        if (this.sortOrder === 'ASC') {
          this.sortOrder = 'DESC';
        } else this.sortOrder = 'ASC';
      }

      if (e.target === this.winnersNumber) this.getWinnersFromServer(this.page, 10, 'id', this.sortOrder);
      if (e.target === this.winnersWins) this.getWinnersFromServer(this.page, 10, 'wins', this.sortOrder);
      if (e.target === this.winnersTime) this.getWinnersFromServer(this.page, 10, 'time', this.sortOrder);
      if (e.target === this.btnPrev) this.getWinnersFromServer(this.page -= 1);
      if (e.target === this.btnNext) this.getWinnersFromServer(this.page += 1);
    });
  }

  // Get all winners from server====================================================================
  getWinnersFromServer(page = this.page, limit = 10, sort = 'id', order = 'ASC'): void {
    const elems = this.winnersTable.querySelectorAll('.winner__table__row');
    elems.forEach((elem) => {
      elem.remove();
    });
    // Get winners amount
    getWinnersCount()
      .then((count) => {
        const winnersCount = count;
        this.pageHeading.innerText = `Winners(${winnersCount})`;

        if (winnersCount) {
          this.pagesAmount = Math.ceil(parseInt(winnersCount, 10) / 10);
          if (this.pagesAmount === this.page
           || this.pagesAmount === 0) {
            this.btnNext.classList.add('garage__btn__next_inactive');
          } else this.btnNext.classList.remove('garage__btn__next_inactive');
          if (this.page === 1) {
            this.btnPrev.classList.add('garage__btn__prev_inactive');
          } else this.btnPrev.classList.remove('garage__btn__prev_inactive');
        }
      });
    // Assemble winner table element
    getAllWinners()
      .then((allWinners) => {
        getWinners(page, limit, sort, order)
          .then((winners) => winners.forEach((winner: WinnerObj) => {
            getCar(winner.id)
              .then((car) => {
                this.winnersTable.appendChild(new Winner(
                  allWinners.findIndex((elem) => elem.id === winner.id) + 1,
                  car.name,
                  winner.wins,
                  winner.time,
                  car.color,
                ).render());
              });
          }));
      });

    this.page = page;
    this.pageNum.innerText = `Page: ${this.page}`;
  }

  // Add new winner to server's database============================================================
  addWinnerToServer(carID: number, carWins: number, carTime: number): void {
    getWinner(carID)
      .then((winner) => {
        // If winner exist on server - update it...
        if (winner.id) {
          updateWinner(carID, winner.wins + carWins, carTime)
            .then(() => {
              this.getWinnersFromServer(this.page);
            });
        }
        // ...if not - create new one
        if (!winner.id) {
          createWinner(carID, carWins, carTime)
            .then(() => {
              this.getWinnersFromServer(this.page);
            });
        }
      });
  }

  // Detele specified winner from server's database=================================================
  deleteWinnerFromServer(id: number): void {
    deleteWinner(id)
      .then(() => {
        this.getWinnersFromServer(this.page);
      });
  }

  // Render page====================================================================================
  render():HTMLElement {
    this.getWinnersFromServer(this.page);

    [
      this.btnPrev,
      this.pageNum,
      this.btnNext,
    ].forEach((btn) => this.btnWrapper.appendChild(btn));

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
      this.btnWrapper,
      this.winnersTable,
    ].forEach((elem) => this.pageWinners.appendChild(elem));

    [
      this.bgImage,
      this.pageWinners,
    ].forEach((elem) => this.mainElement.appendChild(elem));

    return this.mainElement;
  }
}

export default Winners;
