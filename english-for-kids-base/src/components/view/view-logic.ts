import Component from './view-component';
import PageWrapper from './page-wrapper';
import CardsWrapper from './cards-wrapper';
import CardMain from './card-main';
import CardPlay from './card-play';
import CardTrain from './card-train';
import BtnGameStart from './btn-start';
import MenuItem from './side-menu-item';
import Modal from './modal';
import { playSound, startGameCycle } from '../game-cycle';
import { State } from '../interface';
import Words from '../words';

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
      const statsItem = new MenuItem('Statistics').render();
      menu.appendChild(statsItem);
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
  const starsWrap = new Component('div', 'game__stars-box').render();
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
  return document.createElement('div');
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
  document.body.appendChild(modal);
  document.addEventListener('click', () => modal.remove());
  modal.addEventListener('click', () => modal.remove());
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
