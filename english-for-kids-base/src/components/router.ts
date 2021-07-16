import {
  assembleMainPage,
  assemblePlayMode,
  assembleTrainMode,
  assembleStats,
  startPageFadeInOut,
  handleMenuItemStyle,
} from './view/view-logic';
import { State } from './interface';

export default class Router {
  private readonly app: HTMLElement;
  private readonly menu: HTMLElement;
  private readonly footer: HTMLElement;

  constructor(app: HTMLElement, menu: HTMLElement, footer: HTMLElement) {
    this.app = app;
    this.menu = menu;
    this.footer = footer;
  }

  changePage(state: State): void {
    // Switch current menu item visuals
    handleMenuItemStyle(this.menu, state.currentPage);

    // Start page fade effect
    const currentPage = this.app.querySelector('.page-wrapper');
    let delayTime = 0;

    if (currentPage) {
      startPageFadeInOut(currentPage as HTMLElement);
      delayTime = 300;
    }

    // After fade effect completes append new page to app
    setTimeout(() => {
      // Delete current page
      if (currentPage) currentPage?.remove();

      // Generate specific page
      if (state.currentPage === 'Main Page') {
        assembleMainPage()
          .then((page) => this.appendPage(page));

        return;
      }

      if (state.currentPage === 'Statistics') {
        assembleStats()
          .then((page) => this.appendPage(page));
      } else {
        if (state.playMode) {
          assemblePlayMode(state)
            .then((page) => this.appendPage(page));
        }

        if (!state.playMode) {
          assembleTrainMode(state)
            .then((page) => this.appendPage(page));
        }
      }
    }, delayTime);
  }

  // Append new page to app
  appendPage(newPage: HTMLElement): void {
    this.app.insertBefore(newPage, this.footer);
    setTimeout(() => startPageFadeInOut(newPage), 50);
  }
}
