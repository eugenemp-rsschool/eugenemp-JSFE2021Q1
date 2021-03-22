'use strict'

const audio = document.querySelector('.audio');
const buttons = document.querySelector('.btn-container');
const notesBtn = document.querySelector('.btn-notes');
const lettersBtn = document.querySelector('.btn-letters');
const piano = document.querySelector('.piano');
const pianoKeys = document.querySelectorAll('.piano-key');
const scrBtn = document.querySelector('.fullscreen');



const changeScreenMode = () => { 
  if(document.fullscreenElement) {
    document.exitFullscreen();

  }  else {
    if(!document.requestFullscreen) {
      document.documentElement.requestFullscreen(); 
    } 
  }
}


const changeKeyNotation = (type) => {
  if(type == 'letter') {
    pianoKeys.forEach(key => {
      key.classList.add('piano-key-letter'); 
    });
  };
  
  if(type == 'note') {
    pianoKeys.forEach(key => {
      key.classList.remove('piano-key-letter'); 
    });
  };
}


const playSound = (src) => {
  const audio = new Audio();
  audio.src = src;
  //Change time to negative to eliminate click sound with provided audio assets
  audio.currentTime = -0.1;
  audio.play();
}


const activateKey = (e) => {
  //The argument can be an event or element itself
  let el = e.target || e;
  let note = el.dataset.note;

  //If click was made between keys but still inside parent container 
  //the note would be equal undefined so check for this to prevent erros in console
  if(note) {
    el.classList.add(
      'piano-key-active',
      'piano-key-active-pseudo'
      );

    playSound(`assets/audio/${note}.mp3`);
  }
}

const deactivateKey = (e) => {
   //The argument can be an event or element itself
  let el = e.target || e; 

  el.classList.remove(
    'piano-key-active',
    'piano-key-active-pseudo'
    );
}


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


window.addEventListener('keydown', event => {
  //Exit function if key is held down to prevent sound repeating
  if(event.repeat) return;

  pianoKeys.forEach(key => {
    let code = event.code;
    let letter = `Key${key.dataset.letter}`;

    if(code == letter) activateKey(key);
  });
});

window.addEventListener('keyup', event => {
  pianoKeys.forEach(key => {
    deactivateKey(key);
  });
});

piano.addEventListener('mousedown', enableKey);
piano.addEventListener('mouseup', disableKey);
piano.addEventListener('mouseleave', disableKey);
scrBtn.addEventListener('click', changeScreenMode);

buttons.addEventListener('click', event => {
  if(event.target == notesBtn) {
    if(!notesBtn.classList.contains('btn-active')) {
      notesBtn.classList.add('btn-active');
      lettersBtn.classList.remove('btn-active');

      changeKeyNotation('note');
    }
  };

  if(event.target == lettersBtn) {
    if(!lettersBtn.classList.contains('btn-active')) {
      lettersBtn.classList.add('btn-active');
      notesBtn.classList.remove('btn-active');

      changeKeyNotation('letter');
    }
  };
});