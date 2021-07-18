import Component from './view-component';
import './stats-table.scss';

export default class StatsTable {
  private readonly tableWrapper: HTMLElement;
  private readonly tableUpperElement: HTMLElement;
  private readonly tableLowerElement: HTMLElement;

  constructor() {
    this.tableWrapper = new Component('div', 'stats__table__wrapper').render();
    this.tableUpperElement = new Component('table', 'stats__table__upper').render();
    this.tableLowerElement = new Component('table', 'stats__table__lower').render();

    this.tableUpperElement.innerHTML = `<thead class="stats__table__head">
                                          <tr class="stats__table__head__row">
                                            <th class="stats__table__head__data">Category</th>
                                            <th class="stats__table__head__data">Words</th>
                                            <th class="stats__table__head__data">Translation</th>
                                            <th class="stats__table__head__data">Trained</th>
                                            <th class="stats__table__head__data">Success</th>
                                            <th class="stats__table__head__data">Failure</th>
                                            <th class="stats__table__head__data">%</th>
                                          </tr>
                                        </thead>`;

    this.tableLowerElement.innerHTML = '<tbody class="stats__table__body"></tbody>';
  }

  render(): HTMLElement {
    [
      this.tableUpperElement,
      this.tableLowerElement,
    ].forEach((elem) => this.tableWrapper.appendChild(elem));

    return this.tableWrapper;
  }
}
