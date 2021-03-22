'use strict'

const audio = document.querySelector('.audio');
const btn = document.querySelector('.btn-container');
const buttons = document.querySelectorAll('.btn');
const piano = document.querySelector('.piano');
const pianoKeys = document.querySelectorAll('.piano-key');
const scrBtn = document.querySelector('.fullscreen');

/* ======================================================================== */

const changeScrMode = () => { 
  if(document.fullscreenElement) {
    document.exitFullscreen();

  }  else {
    if(!document.requestFullscreen) {
      document.documentElement.requestFullscreen(); 
    } 
  }
}

/* ======================================================================== */

const playSound = (src) => {
  const audio = new Audio();
  audio.src = src;
  audio.currentTime = -1;
  audio.play();
}

/* ======================================================================== */

const activateKey = (event) => {
  let note = event.target.dataset.note;

  if(note) {
    event.target.classList.add('piano-key-active', 'piano-key-active-pseudo');
    playSound(`assets/audio/${note}.mp3`);
  }
}

const deactivateKey = (event) => {
  event.target.classList.remove('piano-key-active', 'piano-key-active-pseudo');
}

/* ======================================================================== */

const enableKey = (event) => {
  activateKey(event);

  pianoKeys.forEach(key => {
    key.addEventListener('mouseover', activateKey);
    key.addEventListener('mouseout', deactivateKey);
  });
}

const disableKey = (event) => {
  deactivateKey(event);

  pianoKeys.forEach(key => {
    key.removeEventListener('mouseover', activateKey);
    key.removeEventListener('mouseout', deactivateKey);
  });
}

/* ======================================================================== */

window.addEventListener('keydown', enableKey);
window.addEventListener('keyup', disableKey);

piano.addEventListener('mousedown', enableKey);
piano.addEventListener('mouseup', disableKey);
piano.addEventListener('mouseleave', disableKey);

scrBtn.addEventListener('click', changeScrMode);