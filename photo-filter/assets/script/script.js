const btnScrMode = document.querySelector('.openfullscreen');

const changeScrMode = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();

  } else {
    if (!document.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
  }
}

btnScrMode.addEventListener('click', event => {

  changeScrMode();
});