"use strict"

const prevMousePos = {
  xPos: 0,
  yPos: 0,
  winXPos: 0,
  winYPos: 0
}

class ModalTint {
  tint = document.createElement("div");

  constructor (tintColor) {
    this.tint.className = "modal-tint";
    this.tint.style.position = "absolute";
    this.tint.style.top = "0";
    this.tint.style.left = "0";
    this.tint.style.width = "100%";
    this.tint.style.height = "100%";
    this.tint.style.zIndex = 1;
    this.tint.style.backgroundColor = tintColor || "rgba(54, 63, 79, 0.6)";

    return this.tint;
  }
}

class ModalWindow {
  modalWindow = document.createElement("div");
  modalWindowHeader = document.createElement("div");
  modalWindowHeader = document.createElement("div");
  modalWindowHeading = document.createElement("span");
  modalWindowBtnClose = document.createElement("div");
  modalWindowContent = document.createElement("div");

  constructor (
                modalWidth,
                modalHeight,
                modalHeading,
                modalMessage
              ) {
    this.modalWindow.className = "modal-window";
    this.modalWindowHeader.className = "modal-header";
    this.modalWindowHeading.className = "modal-heading";
    this.modalWindowBtnClose.className = "modal-btn-close";
    this.modalWindowContent.className = "modal-content";
    this.modalWindowBtnClose.title = "CLose";

    this.modalWindowHeading.innerText = modalHeading;
    this.modalWindowContent.innerText = modalMessage;

    this.modalWindowHeader.appendChild(this.modalWindowBtnClose);
    this.modalWindowHeader.appendChild(this.modalWindowHeading);
    this.modalWindow.appendChild(this.modalWindowHeader);
    this.modalWindow.appendChild(this.modalWindowContent);

    this.modalWindow.style.position = "absolute";
    this.modalWindow.style.width = `${modalWidth}px`;
    this.modalWindow.style.height = `${modalHeight}px`;

    return this.modalWindow;
  }
}


function showModalWin (heading, message, initWidth, initHeight) {
  let mBack = new ModalTint();
  let mWindow = new ModalWindow(initWidth, initHeight, heading, message);

  mBack.appendChild(mWindow);
  document.body.appendChild(mBack);

  mWindow.style.top = (
    `calc(100% / 2 - ${parseInt(mWindow.style.height) / 2}px)`
    );
  mWindow.style.left = (
    `calc(100% / 2 - ${parseInt(mWindow.style.width) / 2}px)`
    );

  return console.log("Modal win created");
}


function closeModalWin () {
  let target = document.getElementsByClassName("modal-tint")[0];
  target.parentNode.removeChild(target);
}


function dragModalWin (e) {
  let win = e.target.parentNode;

  let currentMouseXPos = e.pageX;
  let currentMouseYPos = e.pageY;

  let changeX = currentMouseXPos - prevMousePos.xPos;
  let changeY = currentMouseYPos - prevMousePos.yPos;

  win.style.top = `${prevMousePos.winYPos + changeY}px`;
  win.style.left = `${prevMousePos.winXPos + changeX}px`;

  console.log(`${changeX}, ${changeY}`);
}


function changeModalWinPos (target, xPos, yPos) {
  target.style.top = yPos.toString();
  target.style.left = xPos.toString();
}


window.addEventListener("click", e => {
  let elem = e.target;
  if (elem.classList.contains("modal-btn-close")) closeModalWin();
});

window.addEventListener("resize", e => {

});

window.addEventListener("mousedown", e => {
  let elem = e.target;
  if (elem.classList.contains("modal-header")) {
    prevMousePos.xPos = e.pageX;
    prevMousePos.yPos = e.pageY;
    prevMousePos.winXPos = elem.parentNode.offsetWidth;
    prevMousePos.winYPos = elem.parentNode.offsetTop;
    document.querySelector(".modal-window")
            .addEventListener("mousemove", dragModalWin);
  }
});



window.addEventListener("mouseup", e => {
  if (document.querySelector(".modal-window")) {
    document.querySelector(".modal-window")
          .removeEventListener("mousemove", dragModalWin);
  }
});


showModalWin("Hello World!", "The development still in progress", 600, 500);