import Component from './view-component';
import './game-score-star.scss';

export default class GameScoreStar {
  private readonly starElement: HTMLElement;

  constructor(mode: boolean) {
    let className: string;

    if (mode) className = 'star_yellow';
    else className = 'star_black';

    this.starElement = new Component('div', `game__score-star ${className}`).render();
  }

  render(): HTMLElement {
    return this.starElement;
  }
}
