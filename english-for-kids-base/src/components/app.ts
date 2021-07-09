import AppComponent from './view/view-app';
import Menu from './view/side-menu';
import Header from './view/header';
import Footer from './view/footer';
import Category from './view/category';
import Words from './words';
import {
  switchMenu,
  assembleMenu,
  assembleMainPage,
  assemblePlayMode,
  assembleTrainMode,
  switchGameMode,
  spawnModal,
} from './view/view-logic';

export default class App {
  private readonly rootElement: HTMLElement | null;
  private readonly appElement: AppComponent;
  private readonly menuElement: Menu;
  private readonly headerElement: Header;
  private readonly footerElement: Footer;
  private readonly words: Words;

  private playMode = false;

  constructor() {
    this.rootElement = document.querySelector('body');
    this.appElement = new AppComponent();
    this.menuElement = new Menu();
    this.headerElement = new Header();
    this.footerElement = new Footer();

    this.words = new Words();
  }

  // Start app logic================================================================================
  init(): void {
    const app = this.appElement.render();
    const menu = this.menuElement.render();
    const header = this.headerElement.render();
    const footer = this.footerElement.render();
    const cardsWrapper = new Category().render();
    const btnMenu = header.querySelector('.header__btn__menu');

    // Assemble initial view===================================================
    assembleMenu(menu);
    assembleMainPage(cardsWrapper);

    app.appendChild(menu);
    app.appendChild(header);
    app.appendChild(cardsWrapper);
    app.appendChild(footer);
    this.rootElement?.appendChild(app);

    // Add listeners===========================================================
    // Handle game mode switch===================
    header.addEventListener('change', (e) => {
      if ((e.target as HTMLElement).classList.contains('header__switch__mode__input')) {
        if ((e.target as HTMLInputElement).checked) this.playMode = true;
        if (!(e.target as HTMLInputElement).checked) this.playMode = false;
        switchGameMode(app, this.playMode);
      }
    });

    // Handle menu button========================
    header.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).classList.contains('header__btn__menu')) {
        switchMenu(btnMenu as HTMLElement, menu);
      }
    });

    // Handle menu items=========================
    menu.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).classList.contains('menu__item__main')) {
        cardsWrapper.classList.add('category_transition');

        setTimeout(() => {
          cardsWrapper.innerHTML = '';
          assembleMainPage(cardsWrapper);
        }, 300);

        return;
      }

      if ((e.target as HTMLElement).classList.contains('menu__item')) {
        cardsWrapper.classList.add('category_transition');

        setTimeout(() => {
          cardsWrapper.innerHTML = '';
          if (this.playMode) assemblePlayMode(cardsWrapper, (e.target as HTMLElement).innerText);
          if (!this.playMode) assembleTrainMode(cardsWrapper, (e.target as HTMLElement).innerText);
        }, 300);
      }
    });

    spawnModal(
      'Info',
      `innerRes: ${window.innerWidth}x${window.innerHeight}\n
       outerRes: ${window.outerWidth}x${window.outerHeight}`,
    );
  }

  /* playSound(): void {

  } */
}
