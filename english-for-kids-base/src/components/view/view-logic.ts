import PageWrapper from './page-wrapper';
import CardsWrapper from './cards-wrapper';
import CardMain from './card-main';
import CardPlay from './card-play';
import CardTrain from './card-train';
import BtnGameStart from './btn-start';
import BtnRepeat from './btn-repeat';
import MenuItem from './side-menu-item';
import Modal from './modal';
import { playSound } from '../game-cycle';
import { State } from '../interface';
import { Words } from '../words';

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
  words.getCategories().forEach((name) => {
    menu.appendChild(new MenuItem(name).render());
  });

  // Create menu item for statistics
  const statsItem = new MenuItem('Statistics').render();
  menu.appendChild(statsItem);
}

// Assemble main page==========================================================
function assembleMainPage(): HTMLElement {
  // Create new page and cards wrappers
  const newPageWrap = new PageWrapper().render();
  const newCardsWrap = new CardsWrapper('cards-wrapper page-main__cards-wrapper').render();

  // Append cards to cards wrapper
  words.getCategories().forEach((cat) => {
    const pic = words.getCategory(cat)[0].picture;

    newCardsWrap.appendChild(new CardMain(cat, pic).render());
  });

  // Append cards wrapper to page wrapper
  newPageWrap.appendChild(newCardsWrap);

  return newPageWrap;
}

// Assemble category page in train mode========================================
function assembleTrainMode(state: State): HTMLElement {
  // Create new page and cards wrappers
  const newPageWrap = new PageWrapper().render();
  const newCardsWrap = new CardsWrapper('cards-wrapper page-game__cards-wrapper').render();

  // Generate cards within passed category, add listener that handles flip and speech;
  // Append it to cards wrapper;
  const cat = words.getCategory(state.currentPage);

  cat.forEach((word) => {
    const card = new CardTrain(word.word, word.translate, word.picture).render();

    card.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).classList.contains('card-train__btn-flip')) {
        flipCard(e.target as HTMLElement);
      }
      if ((e.target as HTMLElement).classList.contains('picture__front')) {
        playSound(word.sound);
      }
    });
    newCardsWrap.appendChild(card);
  });

  // Append cards wrapper to page wrapper
  newPageWrap.appendChild(newCardsWrap);

  return newPageWrap;
}

// Assemble category in play mode==============================================
function assemblePlayMode(state: State): HTMLElement {
  // Create new page and cards wrappers
  const newPageWrap = new PageWrapper().render();
  const newCardsWrap = new CardsWrapper('cards-wrapper page-game__cards-wrapper').render();

  // Generate cards within passed category and append it to cards wrapper
  const cat = words.getCategory(state.currentPage);

  cat.forEach((word) => {
    const card = new CardPlay(word.word, word.picture).render();
    newCardsWrap.appendChild(card);
  });

  // Append cards wrapper to page wrapper
  newPageWrap.appendChild(newCardsWrap);

  // Append start and repeat buttons
  newPageWrap.appendChild(new BtnGameStart().render());
  newPageWrap.appendChild(new BtnRepeat().render());

  return newPageWrap;
}

// Assemble statistics page====================================================
function assembleStats(): HTMLElement {
  return document.createElement('div');
}

// Switch game mode visuals====================================================
function switchAppView(app: HTMLElement): void {
  app.classList.toggle('app_play');
}

// Spawn modal window==========================================================
function spawnModal(heading: string, text: string): void {
  const modal = new Modal(heading, text).render();
  document.body.appendChild(modal);
  document.addEventListener('click', () => modal.remove());
  modal.addEventListener('click', () => modal.remove());
}

// Toggle page fade in/out effect==============================================
function startPageFadeInOut(pageElement: HTMLElement): void {
  pageElement.classList.toggle('page-wrapper_transition');
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
};
