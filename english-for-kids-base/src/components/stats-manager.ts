import {
  Store,
  Stats,
} from './interface';
import Words from './words';

const storage = window.localStorage;
const words = new Words();

// Create store with initial values if it not exist
if (!storage.getItem('eugenemp-efk')) {
  initStats();
}

// Return store object
function openStorage(): Store {
  const store = storage.getItem('eugenemp-efk');

  if (store) return JSON.parse(store);

  throw Error('Store open error!');
}

// Clear store
function clearStorage(): void {
  storage.removeItem('eugenemp-efk');
}

// Rebuild stats with initial values
function initStats(): void {
  // Clear localStorage
  clearStorage();
  // Set new store
  storage.setItem('eugenemp-efk', '{}');

  // Build stats elements within current words
  words.getCategories()
    .then((cats) => {
      const store = openStorage();
      const stats: Stats = [];

      // Generate initial element for every word in db
      cats.forEach((cat) => {
        words.getCategory(cat)
          .then((currCat) => {
            currCat.forEach((word) => {
              stats.push({
                category: cat,
                word: word.word,
                translate: word.translate,
                trainCnt: 0,
                successCnt: 0,
                failureCnt: 0,
                guessPercent: 0,
              });
            });
          });
      });

      // Append generated elements to store
      store.stats = stats;

      // Save store
      storage.setItem('eugenemp-efk', JSON.stringify(store));
    });
}

export {
  openStorage,
  clearStorage,
  initStats,
};
