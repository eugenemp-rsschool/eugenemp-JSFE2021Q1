// Type annotation for word unit
type Word = {
  word: string,
  translate: string,
  picture: string,
};

// Type annotation for category of words
type Category = Word[];

// Interface for dictionary that holds categories
interface Dictionary {
  [key: string]: Category;
}

// Interface for state of app object
interface State {
  currentSnd: string,
  currentPage: string;
  playMode: boolean;
}

// Interface for store object
interface Store {
  stats: Stats,
}

// Type for statistics object in storage
type Stats = StatsElement[];

// Interface for statistics element
interface StatsElement {
  word: string,
  category: string,
  translate: string,
  trained: number,
  success: number,
  failure: number,
  guess: number,
}

type SortCol = 'word' | 'category' | 'translate' | 'trained' | 'success' | 'failure' | 'guess';

type SortOrder = 'asc' | 'desc';

type WordPropsHandle = 'success' | 'failure' | 'trained';

export {
  Word,
  Category,
  Dictionary,
  State,
  Store,
  Stats,
  StatsElement,
  SortCol,
  SortOrder,
  WordPropsHandle,
};
