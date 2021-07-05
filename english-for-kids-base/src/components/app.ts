import AppComponent from './view/view-app';

export default class App {
  private readonly rootElement: HTMLElement | null;

  private readonly appElement: HTMLElement;

  constructor() {
    this.rootElement = document.querySelector('body');
    this.appElement = new AppComponent().render();
  }

  // Start app logic================================================================================
  init(): void {
    this.rootElement?.appendChild(this.appElement);
  }
}
