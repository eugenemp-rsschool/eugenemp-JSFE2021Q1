import Component from './view-component';
import { StatsElement } from '../interface';
import './stats-element.scss';

export default class StatsTableElement {
  private readonly tableRowElement: HTMLElement;

  constructor(element: StatsElement) {
    this.tableRowElement = new Component('tr', 'stats__table__body__row').render();

    this.tableRowElement.innerHTML = `<td class="stats__table__body__data">${element.category}</td>
                                      <td class="stats__table__body__data">${element.word}</td>
                                      <td class="stats__table__body__data">${element.translate}</td>
                                      <td class="stats__table__body__data">${element.trainCnt}</td>
                                      <td class="stats__table__body__data">${element.successCnt}</td>
                                      <td class="stats__table__body__data">${element.failureCnt}</td>
                                      <td class="stats__table__body__data">${element.guessPercent}</td>`;
  }

  render(): HTMLElement {
    return this.tableRowElement;
  }
}
