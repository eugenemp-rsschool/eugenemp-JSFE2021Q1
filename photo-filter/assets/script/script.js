"use strict"

const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const filters = document.querySelector(".filters");
const filterList = document.querySelectorAll(".filter");
const btnContainer = document.querySelector(".btn-container");
const btnScrMode = document.querySelector(".openfullscreen");
const fileInput = document.querySelector(".btn-load--input");

let canvasFilter = "";
let imageSource = "assets/img/img.jpg";
let blurRatio;


function saveImage() {

  const image = new Image();

  image.setAttribute('crossOrigin', 'anonymous');
  image.src = imageSource;
  image.onload = function () {
    let link = document.createElement('a');

    canvas.width = image.width;
    canvas.height = image.height;
    ctx.filter = canvasFilter;
    ctx.drawImage(image, 0, 0, image.width, image.height);
    link.href = canvas.toDataURL();
    link.download = "image.png";
    link.click();
    link.delete;
  };
}


function loadImage() {
  const selectedFile = fileInput.files[0];
  const reader = new FileReader();

  reader.readAsDataURL(selectedFile);
  reader.onload = () => {
    imageSource = reader.result;
    imageElement.src = imageSource;
  };
}


function initFilterChanger() {
  const filterValues = {
    "blur": "0px",
    "invert": "0%",
    "sepia": "0%",
    "saturate": "0%",
    "hue-rotate": "0deg",
  };

  return function (elem) {
    let output = elem.nextElementSibling;
    output.value = elem.value;

    imageElement.style.setProperty(`--${elem.name}`,
              `${elem.value}${elem.dataset.sizing}`);
    console.log(`--${elem.name}`,
    `${elem.value}${elem.dataset.sizing}`);

    if (elem.name == "hue") {
      filterValues["hue-rotate"] = elem.value + elem.dataset.sizing;
    } else filterValues[elem.name] = elem.value + elem.dataset.sizing;

    let arr = Object.entries(filterValues);
    canvasFilter = "";
    arr.forEach(item => {
      canvasFilter += `${item[0]}(${item[1]})`;
    });
    console.log(canvasFilter);
  }
}


function resetFilter() {
  filterList.forEach(input => {
    input.value = input.dataset.default;
    changeFilter(input);
  });
}


function getDayPart (hour) {
  let date = new Date();
  let time = hour || date.getHours();

  return (time >= 6  && time < 12) ? "morning" :
         (time >= 12 && time < 18) ?     "day" :
         (time >= 18) ?     "evening" : "night";
}


function initNextPicture(format) {
  let i = 0;
  const picIndex = [ 
    "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", 
    "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"
  ]
  
  return function (dayTime) {
    imageSource = (
      `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${dayTime}/${picIndex[i] + format}`
      );

    drawImage(imageSource);
    (i == picIndex.length - 1) ? i = 0 : i++;
  }
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


const changeFilter = initFilterChanger();
const nextPicture = initNextPicture(".jpg");


filters.addEventListener("input", e => {
  changeFilter(e.target);
});

btnScrMode.addEventListener("click", changeScrMode);

btnContainer.addEventListener("click", e => {
  let elem = e.target;

  if (elem.matches(".btn-next")) nextPicture(getDayPart());
  if (elem.matches(".btn-reset")) resetFilter();
  if (elem.matches(".btn-load")) drawImage();
  if (elem.matches(".btn-save")) saveImage();
});

fileInput.addEventListener("change", e => {
  loadImage();
});

// Init first picture
drawImage(imageSource);


