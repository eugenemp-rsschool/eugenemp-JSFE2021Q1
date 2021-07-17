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
  category: string
  word: string,
  translate: string,
  trainCnt: number,
  successCnt: number,
  failureCnt: number,
  guessPercent: number,
}

export {
  Word,
  Category,
  Dictionary,
  State,
  Store,
  Stats,
  StatsElement,
};
