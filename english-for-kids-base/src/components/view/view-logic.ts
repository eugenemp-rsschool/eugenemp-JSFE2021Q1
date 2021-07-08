import Words from '../words';
import CardMain from './card-main';
import CardPlay from './card-play';
import CardTrain from './card-train';
import MenuItem from './side-menu-item';

const words = new Words();

// Open/close menu=============================================================
function switchMenu(btn: HTMLElement, menu: HTMLElement): void {
  // Process button
  btn.classList.toggle('header__btn__menu_animate');

  setTimeout(() => {
    btn.classList.toggle('header__btn__menu_animate');
    btn.classList.toggle('header__btn__menu_close');
  }, 300);

  // Process menu
  menu.classList.toggle('menu_enabled');
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
    elem.classList.remove('category_transition');
  });
}

// Assemble category in play mode==============================================
function assemblePlayMode(elem: HTMLElement, cat: string): void {
  const cards = words.getCategory(cat);

  cards.forEach((word) => {
    const card = new CardPlay(word.word, word.picture);
    elem.appendChild(card.render());
    elem.classList.remove('category_transition');
  });
}

// Assemble category in train mode=============================================
function assembleTrainMode(elem: HTMLElement, cat: string): void {
  const cards = words.getCategory(cat);

  cards.forEach((word) => {
    const card = new CardTrain(word.word, word.translate, word.picture);
    elem.appendChild(card.render());
    elem.classList.remove('category_transition');
  });
}

// Switch game mode============================================================
function switchGameMode(app: HTMLElement, mode: boolean): void {
  if (mode) app.classList.add('app_play');
  if (!mode) app.classList.remove('app_play');
}

export {
  switchMenu,
  assembleMenu,
  assembleMainPage,
  assemblePlayMode,
  assembleTrainMode,
  switchGameMode,
};
