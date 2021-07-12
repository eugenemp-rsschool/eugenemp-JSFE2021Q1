import AppComponent from './view/view-app';
import PageWrapper from './view/page-wrapper';
import Menu from './view/side-menu';
import Header from './view/header';
import Footer from './view/footer';
import CardsWrapper from './view/cards-wrapper';
import BtnGameStart from './view/btn-start';
import GameScoreStar from './view/game-score-star';
import {
  playSound,
  // shuffleWords,
} from './game-cycle';
import {
  Words,
  Category,
} from './words';
import {
  switchMenu,
  assembleMenu,
  assembleMainPage,
  assemblePlayMode,
  assembleTrainMode,
  switchAppView,
  // spawnModal,
} from './view/view-logic';

export default class App {
  private readonly rootElement: HTMLElement | null;
  private readonly appElement: HTMLElement;
  private readonly menuElement: HTMLElement;
  private readonly headerElement: HTMLElement;
  private readonly footerElement: HTMLElement;
  private readonly pageWrap: HTMLElement;
  private readonly btnMenu: HTMLElement | null;
  private readonly btnStart: HTMLElement;
  private readonly mainCardsWrap: HTMLElement;
  private readonly gameCardsWrap: HTMLElement;
  private readonly gameStarsWrap: HTMLElement | null;
  private readonly words: Words;

  private currentCat: Category | null = null;
  private currentSnd = '';
  private onMainPage = true;
  private playMode = false;

  constructor() {
    this.rootElement = document.querySelector('body');
    this.appElement = new AppComponent().render();
    this.menuElement = new Menu().render();
    this.headerElement = new Header().render();
    this.footerElement = new Footer().render();
    this.pageWrap = new PageWrapper().render();
    this.mainCardsWrap = new CardsWrapper('cards-wrapper page-main__cards-wrapper').render();
    this.gameCardsWrap = new CardsWrapper('cards-wrapper page-game__cards-wrapper').render();
    this.btnStart = new BtnGameStart().render();
    this.btnMenu = this.headerElement.querySelector('.header__btn__menu');
    this.gameStarsWrap = this.headerElement.querySelector('.header__stars-box');

    this.words = new Words();
  }

  /* gameCycle(): void {
    const header = this.headerElement;
    const starContainer = header.querySelector('.header__stars-box');
    const cardsWrapper = this.cardsWrapElement;
    const cardsRandom: Category = [];

    this.currentCat?.forEach((word) => cardsRandom.push(word));

    console.log(cardsRandom);
  } */

  // Start app logic================================================================================
  init(): void {
    // Assemble initial view===================================================
    assembleMenu(this.menuElement);

    // Main page=================================
    assembleMainPage(this.mainCardsWrap);
    this.pageWrap.appendChild(this.mainCardsWrap);

    // Remaining components======================
    for (let i = 0; i < 8; i += 1) {
      this.gameStarsWrap?.appendChild(new GameScoreStar(true).render());
    }

    this.appElement.appendChild(this.menuElement);
    this.appElement.appendChild(this.headerElement);
    this.appElement.appendChild(this.pageWrap);
    this.appElement.appendChild(this.footerElement);
    this.rootElement?.appendChild(this.appElement);

    // Open and generate specific category=====================================
    const changeCategory = (cat: string) => {
      this.pageWrap.classList.add('page-wrapper_transition');

      setTimeout(() => {
        this.gameCardsWrap.innerHTML = '';
        this.currentCat = this.words.getCategory(cat);

        if (this.playMode) assemblePlayMode(this.gameCardsWrap, this.currentCat);
        else assembleTrainMode(this.gameCardsWrap, this.currentCat, playSound);

        this.pageWrap.innerHTML = '';
        this.pageWrap.appendChild(this.gameCardsWrap);
        this.pageWrap.appendChild(this.btnStart);
        this.pageWrap.classList.remove('page-wrapper_transition');
      }, 300);
    };

    // Add listeners===========================================================
    //
    // Handle game mode switch===================
    this.headerElement.addEventListener('change', (e) => {
      if ((e.target as HTMLElement).classList.contains('header__switch__mode__input')) {
        if ((e.target as HTMLInputElement).checked) this.playMode = true;
        else this.playMode = false;

        switchAppView(this.appElement, this.btnStart, this.playMode);

        if (this.currentCat) {
          this.gameCardsWrap.innerHTML = '';

          if (this.playMode) assemblePlayMode(this.gameCardsWrap, this.currentCat);
          else assembleTrainMode(this.gameCardsWrap, this.currentCat, playSound);
        }
      }
    });

    // Handle menu button========================
    this.headerElement.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).classList.contains('header__btn__menu')) {
        switchMenu(this.btnMenu as HTMLElement, this.menuElement);
      }
    });

    // Handle menu items=========================
    this.menuElement.addEventListener('click', (e) => {
      // If main page item is pressed============
      if ((e.target as HTMLElement).classList.contains('menu__item__main')) {
        this.pageWrap.classList.add('page-wrapper_transition');

        setTimeout(() => {
          this.currentCat = null;
          this.pageWrap.innerHTML = '';
          this.pageWrap.appendChild(this.mainCardsWrap);
          this.pageWrap.classList.remove('page-wrapper_transition');
        }, 300);
      }

      // If Category item is pressed============
      if ((e.target as HTMLElement).className === 'menu__item') {
        changeCategory((e.target as HTMLElement).innerText);
      }
    });

    // Handle main cards=========================
    this.mainCardsWrap.addEventListener('click', (e) => {
      const card = (e.target as HTMLElement).closest('.card-main');

      if (card) {
        changeCategory(card.id);
      }
    });
  }
}
