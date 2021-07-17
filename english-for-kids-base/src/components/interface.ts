type Word = {
  word: string,
  translate: string,
  picture: string,
};

type Category = Word[];

interface Dictionary {
  [key: string]: Category;
}

interface State {
  currentSnd: string,
  currentPage: string;
  playMode: boolean;
}

export {
  Word,
  Category,
  Dictionary,
  State,
};
