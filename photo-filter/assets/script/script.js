'use strict'

const filters = document.querySelector('.filters');
const btnContainer = document.querySelector('.btn-container');
const btnScrMode = document.querySelector('.openfullscreen');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');


btnScrMode.addEventListener('click', event => {
  changeScrMode();
});

filters.addEventListener('input', event => {
  changeFilter(event.target);
});

btnContainer.addEventListener('click', event => {
  let elem = event.target;

  /* if(elem.matches('.btn-reset')) resetFilter();
  if(elem.matches('.btn-next')) ;
  if(elem.matches('.btn-load')) ; */
  if (elem.matches('.btn-save')) saveImage();
});


function drawImage(src) {
  let image = new Image();

  image.setAttribute('crossOrigin', 'anonymous');
  image.src = src;
  image.onload = function () {
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
  };
}

function saveImage() {
  //let fileName = ;
  let link = document.createElement('a');

  link.href = canvas.toDataURL();
  link.download = fileName;
  link.click();
  link.delete;
}

function changeFilter(elem) {
  let value = elem.value;
  let output = elem.nextElementSibling;

  output.value = `${value}`;
}

function resetFilter() {

}

function changeScrMode() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    if (!document.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
  }
}