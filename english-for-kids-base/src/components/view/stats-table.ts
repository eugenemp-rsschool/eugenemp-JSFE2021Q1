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
                                            <th class="stats__table__head__data" data-order="asc" data-column="category">Category</th>
                                            <th class="stats__table__head__data" data-order="asc" data-column="word">Word</th>
                                            <th class="stats__table__head__data" data-order="asc" data-column="translate" data-order="asc">Translation</th>
                                            <th class="stats__table__head__data" data-order="asc" data-column="trained" data-order="asc">Trained</th>
                                            <th class="stats__table__head__data" data-order="asc" data-column="success">Correct</th>
                                            <th class="stats__table__head__data" data-order="asc" data-column="failure">Wrong</th>
                                            <th class="stats__table__head__data" data-order="asc" data-column="guess">Guess %</th>
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
