import AppComponent from './view/view-app';
import MainPage from './view/main-page';
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
    const mainPage = new MainPage().render();

    // Assemble initial view======================
    assembleMenu(menu);
    assembleMainPage(mainPage);
    assemblePlayMode(cardsWrapper, 'Action (set A)');

    app.appendChild(menu);
    app.appendChild(header);
    app.appendChild(mainPage);
    app.appendChild(footer);
    this.rootElement?.appendChild(app);

    // Add listeners==============================
    header.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).classList.contains('header__btn__menu')) {
        switchMenu(e.target as HTMLElement, menu);
      }
      /* if ((e.target as HTMLElement).classList.contains('header__btn__mode')) {
        console.log('Mode switched');
      } */
    });
  }
}
