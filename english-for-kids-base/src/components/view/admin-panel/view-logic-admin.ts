import Words from '../../words';
import HeaderAdmin from './header-admin';
import Footer from '../footer';
import PageWrapper from '../page-wrapper';
import CardsWrapperAdmin from './cards-wrapper-admin';
import CardCategory from './card-category';
import CardCategoryNew from './card-category-new';
import CardWord from './card-word';
import CardWordNew from './card-word-new';
import AppComponent from '../view-app';
import CardWordEdit from './card-word-edit';

const words = new Words();

// Assemble admin page
function assembleAdminPanel(page: HTMLElement): HTMLElement {
  const app = new AppComponent().render();
  const header = new HeaderAdmin().render();
  const footer = new Footer().render();

  [header, page, footer].forEach((elem) => app.appendChild(elem));

  return app;
}

// Assemble categories management page
async function assembleCatMgmtPage(): Promise<HTMLElement> {
  const newPageWrap = new PageWrapper().render();
  const newCardsWrap = new CardsWrapperAdmin().render();

  const response = words.getCategories();
  const cats = await response;

  cats.forEach((cat) => {
    const card = new CardCategory(cat, cats.length).render();
    newCardsWrap.appendChild(card);
  });

  newCardsWrap.appendChild(new CardCategoryNew().render());
  newPageWrap.appendChild(newCardsWrap);

  return newPageWrap;
}

// Assemble words-in-category management page
async function assembleWordMgmtPage(name: string): Promise<HTMLElement> {
  const newPageWrap = new PageWrapper().render();
  const newCardsWrap = new CardsWrapperAdmin().render();

  const response = words.getCategory(name);
  const cat = await response;

  cat.forEach((word) => {
    const card = new CardWord(word.word, word.translate, 'file.mp3', word.picture).render();
    newCardsWrap.appendChild(card);
  });

  newCardsWrap.appendChild(new CardWordNew().render());
  newPageWrap.appendChild(newCardsWrap);

  return newPageWrap;
}

// switch word card to edit mode
function switchWordToEdit(elem: HTMLElement): void {
  const card = elem.closest('.card-word');
  const word = (card?.querySelector('.card__word') as HTMLElement).innerText;
  const transl = (card?.querySelector('.card__transl') as HTMLElement).innerText;

  card?.replaceWith(new CardWordEdit(word, transl).render());
}

// switch word card to edit mode
/* async function switchWordToShow(elem: HTMLElement): Promise<void> {
  const card = elem.closest('.card-word-edit');
  const word = (card?.querySelector('.card-word-edit__input-word') as HTMLInputElement).value;
} */

async function openCategory(cat: string): Promise<void> {
  const app = document.querySelector('.app');
  const newPage = await assembleWordMgmtPage(cat);
  const currPage = app?.querySelector('.page-wrapper');

  currPage?.replaceWith(newPage);
}

document.addEventListener('click', (e) => {
  const elem = e.target as HTMLElement;

  if (elem.classList.contains('card-word__btn-change')) switchWordToEdit(elem);
  if (elem.classList.contains('card-cat__btn-add')) {
    const card = elem.closest('.card-cat');
    const cat = (card?.querySelector('.card-cat__heading') as HTMLElement).innerText;

    if (cat) openCategory(cat);
  }
});

export {
  assembleAdminPanel,
  assembleCatMgmtPage,
  assembleWordMgmtPage,
};
