import Component from '../shared/component';
import './main.scss';

class Main {
  private readonly mainElement: HTMLElement;

  constructor() {
    this.mainElement = new Component('main', ['main']).render();
  }

  render():HTMLElement {
    return this.mainElement;
  }
}

export default Main;
