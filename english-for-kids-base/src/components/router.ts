import {
  assembleMainPage,
  assemblePlayMode,
  assembleTrainMode,
  assembleStats,
  startPageFadeInOut,
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
      let newPage: HTMLElement | undefined;

      if (state.currentPage === 'Main Page') {
        newPage = assembleMainPage();
        this.app.insertBefore(newPage, this.footer);
        startPageFadeInOut(newPage);
      }

      if (state.currentPage === 'Statistics') {
        newPage = assembleStats();
        this.app.insertBefore(newPage, this.footer);
        startPageFadeInOut(newPage);
      } else {
        if (state.playMode) {
          newPage = assemblePlayMode(state);
          this.app.insertBefore(newPage, this.footer);
          startPageFadeInOut(newPage);
        }

        if (!state.playMode) {
          newPage = assembleTrainMode(state);
          this.app.insertBefore(newPage, this.footer);
          startPageFadeInOut(newPage);
        }
      }
    }, delayTime);
  }
}
