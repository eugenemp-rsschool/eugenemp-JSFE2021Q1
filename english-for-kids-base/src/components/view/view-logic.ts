import PageWrapper from './page-wrapper';
import CardsWrapper from './cards-wrapper';
import CardMain from './card-main';
import CardPlay from './card-play';
import CardTrain from './card-train';
import GameStarsBox from './game-stars-box';
import BtnGameStart from './btn-start';
import BtnLogin from './btn-login';
import BtnStatsRepeat from './btn-stats-repeat';
import BtnStatsReset from './btn-stats-reset';
import MenuItem from './side-menu-item';
import Modal from './modal';
import {
  startGameCycle,
  handleWordStat,
} from '../game-cycle';
import synthVoice from '../speech-synth';
import { State } from '../interface';
import Words from '../words';
import {
  resetTable,
  getTable,
  SortOrder,
  SortCol,
} from '../stats-manager';
import StatsTable from './stats-table';
import Component from './view-component';

const words = new Words();

// Open/close menu=============================================================
function switchMenu(btn: HTMLElement, menu: HTMLElement): void {
  // Animate button
  (btn as HTMLElement).classList.toggle('header__btn__menu_animate');

  setTimeout(() => {
    (btn as HTMLElement).classList.toggle('header__btn__menu_animate');
    (btn as HTMLElement).classList.toggle('header__btn__menu_close');
  }, 300);

  // Open menu
  menu.classList.toggle('menu_enabled');

  // Close menu if click is made outside
  document.addEventListener('click', (e) => {
    if (menu.classList.contains('menu_enabled')) {
      if (e.target !== btn && e.target !== menu) switchMenu(btn, menu);
    }
  });
}

// Flip card===================================================================
function flipCard(btn: HTMLElement): void {
  const card = btn.closest('.card-train');
  card?.classList.toggle('card-train_flipped');

  card?.addEventListener('mouseleave', () => flipCard(btn));
  card?.addEventListener('touchend', () => flipCard(btn));
}

// Assemble side menu==========================================================
function assembleMenu(menu: HTMLElement): void {
  // Create menu item for main page
  const mainItem = new MenuItem('Main Page').render();
  menu.appendChild(mainItem);

  // Create menu items for word categories
  words.getCategories()
    .then((cats: string[]) => {
      cats.forEach((name) => {
        menu.appendChild(new MenuItem(name).render());
      });

      // Create menu item for statistics
      menu.appendChild(new MenuItem('Statistics').render());

      // Add login button
      menu.appendChild(new BtnLogin().render());
    });
}

// Assemble main page==========================================================
async function assembleMainPage(): Promise<HTMLElement> {
  // Create new page and cards wrappers
  const newPageWrap = new PageWrapper().render();
  const newCardsWrap = new CardsWrapper('cards-wrapper page-main__cards-wrapper').render();

  // Append cards to cards wrapper
  const promise = words.getCategories();
  const cats = await promise;

  cats.forEach((cat) => {
    words.getCategory(cat)
      .then((currentCat) => {
        const pic = currentCat[0].picture;

        newCardsWrap.appendChild(new CardMain(cat, pic).render());
      });
  });

  // Append cards wrapper to page wrapper
  newPageWrap.appendChild(newCardsWrap);

  return newPageWrap;
}

// Assemble category page in train mode========================================
async function assembleTrainMode(state: State): Promise<HTMLElement> {
  // Create new page and cards wrappers
  const newPageWrap = new PageWrapper().render();
  const newCardsWrap = new CardsWrapper('cards-wrapper page-game__cards-wrapper').render();

  // Generate cards within passed category, add listener that handles flip and speech;
  // Append it to cards wrapper;
  const promise = words.getCategory(state.currentPage);
  const cat = await promise;

  cat.forEach((word) => {
    const card = new CardTrain(word.word, word.translate, word.picture).render();

    card.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).classList.contains('card-train__btn-flip')) {
        flipCard(e.target as HTMLElement);
      }
      if ((e.target as HTMLElement).classList.contains('picture__front')) {
        synthVoice(word.word);
      }
      handleWordStat(word.word, 'trained');
    });

    newCardsWrap.appendChild(card);
  });

  // Append cards wrapper to page wrapper
  newPageWrap.appendChild(newCardsWrap);

  return newPageWrap;
}

// Assemble category in play mode==============================================
async function assemblePlayMode(state: State): Promise<HTMLElement> {
  // Create new page and cards wrappers
  const newPageWrap = new PageWrapper().render();
  const newCardsWrap = new CardsWrapper('cards-wrapper page-game__cards-wrapper').render();

  // Generate cards within passed category and append it to cards wrapper
  const promise = words.getCategory(state.currentPage);
  const cat = await promise;

  cat.forEach((word) => {
    const card = new CardPlay(word.word, word.picture).render();
    newCardsWrap.appendChild(card);
  });

  // Create stars box, start button and add listener with game handler to it
  const starsWrap = new GameStarsBox().render();
  const btnStart = new BtnGameStart().render();

  btnStart.addEventListener('click', () => startGameCycle(cat));

  // Append elements to page
  [
    starsWrap,
    newCardsWrap,
    btnStart,
  ].forEach((elem) => newPageWrap.appendChild(elem));

  return newPageWrap;
}

// Assemble statistics page====================================================
async function assembleStats(): Promise<HTMLElement> {
  // Create new page wrapper and table
  const newPageWrap = new PageWrapper().render();
  const newTable = new StatsTable().render();
  const btnWrap = new Component('div', 'stats__btn__wrapper').render();
  const btnRepeat = new BtnStatsRepeat().render();
  const btnReset = new BtnStatsReset().render();

  // Generate table elements
  const tbody = newTable.querySelector('.stats__table__body');

  getTable('word', 'asc', tbody as HTMLElement);

  // Init listeners
  btnReset.addEventListener('click', resetTable);
  newPageWrap.addEventListener('click', (e) => {
    const btn = e.target as HTMLElement;
    const btns = newTable.querySelectorAll('.stats__table__head__data');

    // Handle table buttons (columns)
    if (btn.classList.contains('stats__table__head__data')) {
      const col = btn.dataset.column;
      const ord = btn.dataset.order;

      // Regenerate table if sort options changes
      if (col) getTable(col as SortCol, ord as SortOrder);
      if (ord === 'asc') btn.dataset.order = 'desc';
      if (ord === 'desc') btn.dataset.order = 'asc';

      // Handle table column visuals depending on sorting
      if (col) {
        btns.forEach((currBtn) => {
          if (currBtn.classList.contains('stats__table__head__data_active')) {
            currBtn.classList.remove('stats__table__head__data_active');
          }
        });
        btn.classList.add('stats__table__head__data_active');
      }
    }

    // Handle words repeat button
    // if (e.target === btnRepeat)

    // Handle stats reset button
    if (e.target === btnReset) {
      resetTable();

      btns.forEach((currBtn) => {
        if (currBtn.classList.contains('stats__table__head__data_active')) {
          currBtn.classList.remove('stats__table__head__data_active');
        }
      });
    }
  });

  // Append elements to page
  [
    btnRepeat,
    btnReset,
  ].forEach((btn) => btnWrap.appendChild(btn));
  [
    btnWrap,
    newTable,
  ].forEach((elem) => newPageWrap.appendChild(elem));

  return newPageWrap;
}

// Switch game mode visuals====================================================
function switchAppView(app: HTMLElement): void {
  app.classList.toggle('app_play');
}

// Toggle page fade in/out effect==============================================
function startPageFadeInOut(pageElement: HTMLElement): void {
  pageElement.classList.toggle('page-wrapper_transition');
}

// Switch currentmenu item item visuals========================================
function handleMenuItemStyle(menu: HTMLElement, item: string): void {
  menu.childNodes.forEach((elem) => {
    if ((elem as HTMLElement).innerText === item) {
      (elem as HTMLElement).classList.add('menu__item_selected');
    } else {
      (elem as HTMLElement).classList.remove('menu__item_selected');
    }
  });
}

// Spawn modal window==========================================================
function spawnModal(heading: string, text: string): void {
  const modal = new Modal(heading, text).render();
  modal.addEventListener('click', () => modal.remove());
  document.body.appendChild(modal);
}

export {
  switchMenu,
  assembleMenu,
  assembleMainPage,
  assemblePlayMode,
  assembleTrainMode,
  assembleStats,
  switchAppView,
  spawnModal,
  startPageFadeInOut,
  handleMenuItemStyle,
};
