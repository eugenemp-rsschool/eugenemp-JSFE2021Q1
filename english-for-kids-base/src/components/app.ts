import AppComponent from './view/view-app';
import Menu from './view/side-menu';
import Header from './view/header';
import Footer from './view/footer';
import { State } from './interface';
import {
  switchMenu,
  assembleMenu,
  switchAppView,
  spawnModal,
} from './view/view-logic';
import { generateRepeatWords } from './stats-manager';
import Words from './words';
import Router from './router';
import handleAuth from './auth';

export default class App {
  private readonly rootElement: HTMLElement | null;
  private readonly appElement: HTMLElement;
  private readonly menuElement: HTMLElement;
  private readonly headerElement: HTMLElement;
  private readonly footerElement: HTMLElement;
  private readonly btnMenu: HTMLElement | null;
  private readonly router: Router;
  private readonly state: State;
  private readonly words: Words;

  constructor() {
    this.rootElement = document.body;
    this.appElement = new AppComponent().render();
    this.menuElement = new Menu().render();
    this.headerElement = new Header().render();
    this.footerElement = new Footer().render();
    this.btnMenu = this.headerElement.querySelector('.header__btn__menu');
    this.router = new Router(this.appElement, this.menuElement, this.footerElement);
    this.words = new Words();

    this.state = {
      currentSnd: '',
      currentPage: 'Main Page',
      playMode: false,
    };
  }

  // Start app logic================================================================================
  init(): void {
    // Assemble initial view===================================================
    //
    // Assemble menu
    assembleMenu(this.menuElement);

    // Append main elements to app root
    [
      this.menuElement,
      this.headerElement,
      this.footerElement,
    ].forEach((elem) => this.appElement.appendChild(elem));

    // Append app element to body
    this.rootElement?.appendChild(this.appElement);

    // Add listeners===========================================================
    //
    // Handle game mode switch
    this.headerElement.addEventListener('change', (e) => {
      if ((e.target as HTMLElement).classList.contains('header__switch__mode__input')) {
        const btnSwitch = e.target as HTMLInputElement;

        // Change game mode state variable
        if (btnSwitch.checked) this.state.playMode = true;
        else this.state.playMode = false;

        // Switch app visuals
        switchAppView(this.appElement);

        // Update current page
        if (
          this.state.currentPage !== 'Main Page'
       && this.state.currentPage !== 'Statistics'
        ) {
          this.router.changePage(this.state);
        }
      }
    });

    // Handle menu button
    this.headerElement.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).classList.contains('header__btn__menu')) {
        switchMenu(this.btnMenu as HTMLElement, this.menuElement);
      }
    });

    // Handle menu items
    this.menuElement.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).classList.contains('menu__item')) {
        const item = e.target as HTMLElement;

        this.state.currentPage = item.innerText;
        this.router.changePage(this.state);
      }

      if ((e.target as HTMLElement).classList.contains('menu__btn-login')) {
        handleAuth();
      }
    });

    // Handle main cards and repeat words btn
    this.appElement.addEventListener('click', (e) => {
      const card = (e.target as HTMLElement).closest('.card-main');

      if (card) {
        this.state.currentPage = card.id;
        this.router.changePage(this.state);
      }

      if ((e.target as HTMLElement).classList.contains('stats__btn-repeat')) {
        generateRepeatWords()
          .then((cat) => {
            if (cat.length !== 0) {
              this.state.currentPage = 'Repeat';
              this.router.changePage(this.state);
            } else spawnModal('', 'No words to repeat!');
          });
      }
    });

    // Spawn initial main page=================================================
    window.onload = () => {
      this.router.changePage(this.state);
    };
  }
}
