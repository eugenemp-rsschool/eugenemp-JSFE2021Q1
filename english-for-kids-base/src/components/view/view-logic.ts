import {
  Words,
  Category,
} from '../words';
import CardMain from './card-main';
import CardPlay from './card-play';
import CardTrain from './card-train';
import MenuItem from './side-menu-item';
import Modal from './modal';

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

  card?.addEventListener('mouseleave', () => {
    flipCard(btn);
  });

  card?.addEventListener('touchend', () => {
    flipCard(btn);
  });
}

// Assemble side menu==========================================================
function assembleMenu(menu: HTMLElement): void {
  const mainItem = new MenuItem('Main Page').render();
  mainItem.classList.add('menu__item__main');
  menu.appendChild(mainItem);

  words.getCategories().forEach((name) => {
    menu.appendChild(new MenuItem(name).render());
  });
}

// Assemble main page==========================================================
function assembleMainPage(elem: HTMLElement): void {
  words.getCategories().forEach((cat) => {
    const pic = words.getCategory(cat)[0].picture;

    elem.appendChild(new CardMain(cat, pic).render());
  });

  elem.classList.remove('cards-wrapper_transition');
}

// Assemble category in train mode=============================================
function assembleTrainMode(
  elem: HTMLElement,
  cat: Category | null,
  audioFn: CallableFunction,
): void {
  cat?.forEach((word) => {
    const card = new CardTrain(word.word, word.translate, word.picture).render();

    card.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).classList.contains('card-train__btn-flip')) {
        flipCard(e.target as HTMLElement);
      }
      if ((e.target as HTMLElement).classList.contains('picture__front')) {
        audioFn(word.sound);
      }
    });
    elem.appendChild(card);
  });

  elem.classList.remove('cards-wrapper_transition');
}

// Assemble category in play mode==============================================
function assemblePlayMode(elem: HTMLElement, cat: Category | null): void {
  cat?.forEach((word) => {
    const card = new CardPlay(word.word, word.picture).render();
    elem.appendChild(card);
  });

  elem.classList.remove('cards-wrapper_transition');
}

// Switch game mode============================================================
function switchAppView(app: HTMLElement, mode: boolean): void {
  if (mode) app.classList.add('app_play');
  if (!mode) app.classList.remove('app_play');
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
  switchAppView,
  spawnModal,
};
