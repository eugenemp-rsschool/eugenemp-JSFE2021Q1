"use strict"

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const filters = document.querySelector(".filters");
const btnContainer = document.querySelector(".btn-container");
const btnScrMode = document.querySelector(".openfullscreen");

const inputElement = document.querySelector(".btn-load--input");

const currentFilterValues = {
  blur: 0,
  invert: 0,
  sepia: 0,
  saturate: 0,
  hue: 0
};

/* ========================================================================= */

function drawImage(src, filter) {
  let image = new Image();

  image.setAttribute('crossOrigin', 'anonymous');
  image.src = src;
  image.onload = function () {
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.filter = filter;
    ctx.drawImage(image, 0, 0);

  };
}








function saveImage(fileName) {
  fileName = fileName || "image";
  let link = document.createElement('a');

  link.href = canvas.toDataURL();
  link.download = fileName;
  link.click();
  link.delete;
}








function changeFilter(elem) {
  let value = elem.value;
  let output = elem.nextElementSibling;

  currentFilterValues[elem.name] = value;
  output.value = `${currentFilterValues[elem.name]}`;

  let filter = `${elem.name}(${currentFilterValues[elem.name]}px)`;
  drawImage("/photo-filter/assets/img/img.jpg", filter);

  console.log(`Filter: ${elem.name}, value: ${output.value}`);
  console.log(`${elem.name}(${currentFilterValues[elem.name]}px)`);
}








function resetFilter() {
  const filterList = document.querySelectorAll(".filter");
  
  filterList.forEach(input => {
    input.value = input.dataset.default;
    changeFilter(input);
  });
}








function nextPicture(dayTime) {
  const link = (
    `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${dayTime}`
    );

  let time = new Date();


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




/* ========================================================================= */

filters.addEventListener('input', e => {
  changeFilter(e.target);
});

btnContainer.addEventListener('click', e => {
  let elem = e.target;

  if(elem.matches('.btn-reset')) resetFilter();
  //if(elem.matches('.btn-next')) ;
  if (elem.matches('.btn-load')) drawImage();
  if (elem.matches('.btn-save')) saveImage();
});

btnScrMode.addEventListener('click', changeScrMode);


/* ========================================================================= */
drawImage("/photo-filter/assets/img/img.jpg");
