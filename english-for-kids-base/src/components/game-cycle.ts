import { Category, Word } from './interface';
import Modal from './view/modal';
import GameScoreStar from './view/game-score-star';
import {
  MODAL_SUCCESS,
  MODAL_FAILURE,
} from './view/modal-content-game';
import synthVoice from './speech-synth';

const PATH_AUDIO = 'assets/audio/';
const SND_CORRECT = 'correct.mp3';
const SND_INCORRECT = 'error.mp3';
const SND_SUCCESS = 'success.mp3';
const SND_FAILIURE = 'failure.mp3';

const ROUND_DELAY = 1000;
const FINISH_DELAY = 3000;

const roundStat = {
  allTurnCnt: 0,
  successTurnCnt: 0,
  failureTurnCnt: 0,
};

// Play sounds=================================================================
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

// Handle score stars adding===================================================
function addScoreStar(starsBox: HTMLElement, type: boolean): void {
  const width = window.innerWidth;

  // If limit of stars exceeds remove firs star before append new one based on
  // viewport width
  if (width <= 1279) {
    if (starsBox.children.length >= 8) starsBox.firstChild?.remove();
  }

  if (width >= 1280) {
    if (starsBox.children.length >= 16) starsBox.firstChild?.remove();
  }
  // Append new star based on type
  starsBox.appendChild(new GameScoreStar(type).render());
}

// Handle game start===========================================================
function startGameCycle(cat: Category): void {
  // Query needed game page elements=============
  const page = document.querySelector('.page-wrapper') as HTMLElement;
  const stars = document.querySelector('.game__stars-box') as HTMLElement;
  const cards = page.querySelector('.cards-wrapper') as HTMLElement;
  const btnStart = page.querySelector('.game__btn-start') as HTMLElement;
  const btnRepeat = btnStart.cloneNode(true) as HTMLElement;

  // Shuffle words===============================
  const shuffledCat = shuffleWords(cat);
  // Init max count of successfull turns=========
  const lastWord = shuffledCat.length;
  // Init current position within a category=====
  let currentWord = 0;

  // Replacing start button with repeat button
  page?.replaceChild(btnRepeat, btnStart);

  setTimeout(() => {
    btnRepeat?.classList.add('game__btn-start_mode-repeat');
  }, 50);

  // Remove cards disabled state
  cards.childNodes.forEach((node) => {
    if ((node as HTMLElement).classList.contains('card-play')) {
      (node as HTMLElement).classList.remove('card-play_inactive');
    }
  });

  // Start current turn==========================
  function startTurn(word: Word): void {
    if (currentWord === lastWord) {
      currentWord = 0;

      // If all cards guessed handle game finish
      finishGame();

      return;
    }

    setTimeout(() => {
      // Play word pronunciation
      synthVoice(word.word);
      // Add listener with repeat handler
      if (btnRepeat) (btnRepeat as HTMLElement).onclick = () => synthVoice(word.word);
      // Add listenet with card click handlers
      cards?.childNodes.forEach((node) => node.addEventListener('click', handleTurn));
    }, ROUND_DELAY);
  }

  // Check chosen card===========================
  function handleTurn(event: Event): void {
    const card = (event.target as HTMLElement).closest('.card-play');

    if (card) {
      // If correct card clicked=================
      if (card.id === shuffledCat[currentWord].word) {
        // Count successful turn
        roundStat.successTurnCnt += 1;
        // Add yellow star
        addScoreStar(stars, true);
        // Change card state to disabled
        card.classList.add('card-play_disabled');
        // Play "correct" sound
        playSound(SND_CORRECT);
        // Remove unneeded listener
        cards?.childNodes.forEach((node) => node.removeEventListener('click', handleTurn));

        currentWord += 1;
        startTurn(shuffledCat[currentWord]);

      // If incorrect card clicked===============
      } else {
        // Count successful turn
        roundStat.failureTurnCnt += 1;
        // Add black star
        addScoreStar(stars, false);
        // Play "error" sound
        playSound(SND_INCORRECT);
      }
    }
  }

  // Start first turn============================
  startTurn(shuffledCat[currentWord]);
}

function finishGame(): void {
  // Compute all turns count
  roundStat.allTurnCnt = roundStat.successTurnCnt + roundStat.failureTurnCnt;

  // Show modal (depending on round results) and delete it after specific time
  let modal: HTMLElement;

  if (roundStat.failureTurnCnt === 0) {
    modal = new Modal('Win!', MODAL_SUCCESS).render();
    playSound(SND_SUCCESS);
  } else {
    modal = new Modal(`Errors: ${roundStat.failureTurnCnt}`, MODAL_FAILURE).render();
    playSound(SND_FAILIURE);
  }

  document.body.appendChild(modal);
  setTimeout(() => {
    modal.remove();

    // Switch to main page
    window.location.reload();
  }, FINISH_DELAY);
}

export {
  playSound,
  shuffleWords,
  startGameCycle,
};
