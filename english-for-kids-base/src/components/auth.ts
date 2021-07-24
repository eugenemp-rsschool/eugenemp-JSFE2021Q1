import { spawnModal } from './view/view-logic';
import MODAL_AUTH from './view/modal-content-auth';
import {
  assembleAdminPanel,
  assembleCatMgmtPage,
} from './view/admin-panel/view-logic-admin';
import MODAL_LOGIN_FAILURE from './view/modal-content-login-fail';

/* const URL = 'http://localhost';
const PORT = '3000'; */

window.onhashchange = () => {
  if (window.location.hash === 'category') {
    appendPanel()
      .then(() => console.log('panel appended'));
  }
};

function checkUser(name: string, pass: string): boolean {
  if (name === 'admin' && pass === 'admin') return true;
  return false;
  /* const data = {
    name: [name],
    pass: [pass],
  }; */

  /* const response = fetch(`${URL}:${PORT}`, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }); */

  /* return response; */
}

async function handleAuth(): Promise<void> {
  spawnModal('Log in', MODAL_AUTH);

  const modalBg = document.querySelector('.modal__bg');
  const formAuth = document.querySelector('.modal__content__auth__form');
  const inputName = formAuth?.querySelector('.modal__content__auth__input-name');
  const inputPass = formAuth?.querySelector('.modal__content__auth__input-pass');

  formAuth?.addEventListener('submit', (e) => {
    e.preventDefault();

    const res = checkUser(
      (inputName as HTMLInputElement).value,
      (inputPass as HTMLInputElement).value,
    );

    if (res) {
      modalBg?.remove();
      appendPanel()
        .then(() => console.log('panel appended'));

      return;
    }

    modalBg?.remove();
    spawnModal('Problem logging in..', MODAL_LOGIN_FAILURE);

    /* .then((response) => {
        console.log(response.headers);
        modalBg?.remove();
        appendPanel()
          .then(() => console.log('panel appended'));
      })

      .catch((error) => {
        modalBg?.remove();
        throw new Error((error as Error).message);
      }); */
  });
}

// Switch to admin panel
async function appendPanel(): Promise<void> {
  const currentApp = document.querySelector('.app');
  const catsPage = await assembleCatMgmtPage();
  const newApp = await assembleAdminPanel(catsPage);

  window.location.hash = 'category';

  setTimeout(() => {
    catsPage.classList.remove('page-wrapper_transition');
  }, 100);

  currentApp?.replaceWith(newApp);
}

export default handleAuth;
