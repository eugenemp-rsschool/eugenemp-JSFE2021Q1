import { Category, Word } from './interface';
import GameScoreStar from './view/game-score-star';
import Modal from './view/modal';

const PATH_AUDIO = 'assets/audio/';
const SND_CORRECT = 'correct.mp3';
const SND_INCORRECT = 'error.mp3';

// Play word pronunciation=====================================================
function playSound(sound: string): void {
  const audio = new Audio(PATH_AUDIO + sound);
  audio.play();
}

// Shuffle words randomly======================================================
function shuffleWords(wordsArr: Category | null): Category {
  const arr: Category = [];
  wordsArr?.forEach((word) => arr.push(word));

  let currentIndex = arr.length;
  let randomIndex: number;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
  }

  return arr;
}

// Handle game start===========================================================
function startGameCycle(cat: Category): void {
  // Query needed game page elements=============
  const page = document.querySelector('.page-wrapper');
  const stars = document.querySelector('.header__stars-box');
  const cards = page?.querySelector('.cards-wrapper');
  const btnStart = page?.querySelector('.game__btn-start');
  const btnRepeat = page?.querySelector('.game__btn-repeat');

  stars?.classList.add('header__stars-box_enabled');
  btnStart?.classList.remove('game__btn-start_enabled');
  btnRepeat?.classList.add('game__btn-repeat_enabled');

  // Shuffle words===============================
  const shuffledCat = shuffleWords(cat);
  // Init max count of successfull turns=========
  const lastWord = shuffledCat.length;
  // Init current position within a category=====
  let currentWord = 0;

  // Start current turn==========================
  function startTurn(word: Word): void {
    if (currentWord === lastWord) {
      currentWord = 0;

      // Spawn modal=============================
      const modal = new Modal('Congratulations!', 'You win!').render();
      document.body.appendChild(modal);
      setTimeout(() => modal.remove(), 3000);

      return;
    }

    setTimeout(() => {
      playSound(word.sound);
      if (btnRepeat) (btnRepeat as HTMLElement).onclick = () => playSound(word.sound);
      cards?.childNodes.forEach((node) => node.addEventListener('click', handleTurn));
    }, 500);
  }

  // Check chosen card===========================
  function handleTurn(event: Event): void {
    const card = (event.target as HTMLElement).closest('.card-play');

    if (card) {
      // If correct card clicked=================
      if (card.id === shuffledCat[currentWord].word) {
        stars?.appendChild(new GameScoreStar(true).render());
        card.classList.add('card-play_disabled');
        playSound(SND_CORRECT);

        cards?.childNodes.forEach((node) => node.removeEventListener('click', handleTurn));

        currentWord += 1;
        startTurn(shuffledCat[currentWord]);

      // If incorrect card clicked===============
      } else {
        stars?.appendChild(new GameScoreStar(false).render());
        card.classList.add('card-play_disabled');
        playSound(SND_INCORRECT);
      }
    }
  }

  // Start first turn============================
  startTurn(shuffledCat[currentWord]);
}

export {
  playSound,
  shuffleWords,
  startGameCycle,
};
