import { spawnModal } from './view/view-logic';
import MODAL_AUTH from './view/modal-content-auth';

const URL = 'localhost';
const PORT = '3000';

function checkUser(name: string, pass: string): Promise<Response> {
  const data = {
    name: [name],
    pass: [pass],
  };

  const response = fetch(`${URL}:${PORT}`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return response;
}

async function handleAuth(): Promise<void> {
  spawnModal('Log in', MODAL_AUTH);

  const modalBg = document.querySelector('.modal__bg');
  const formAuth = document.querySelector('.modal__content__auth__form');
  const inputName = formAuth?.querySelector('.modal__content__auth__input-name');
  const inputPass = formAuth?.querySelector('.modal__content__auth__input-pass');

  formAuth?.addEventListener('submit', (e) => {
    e.preventDefault();

    checkUser((inputName as HTMLInputElement).value, (inputPass as HTMLInputElement).value)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        modalBg?.remove();
      })
      .catch((error) => {
        modalBg?.remove();
        throw new Error(error);
      });
  });
}

export default handleAuth;
