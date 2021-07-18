import { Store } from './interface';
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

  throw Error('Error opening store!');
}

// Clear store
function clearStorage(): void {
  if (storage.getItem('eugenemp-efk')) {
    storage.removeItem('eugenemp-efk');
  }
}

// Rebuild stats with initial values
async function initStats(): Promise<void> {
  // Clear localStorage
  clearStorage();

  // Create new and empty one
  storage.setItem('eugenemp-efk', '{"stats": []}');

  // Build stats elements within current words
  const store = openStorage();

  // Generate initial element for every word in db
  await words.getCategories()
    .then((cats) => {
      for (let i = 0; i < cats.length; i += 1) {
        words.getCategory(cats[i])
          .then((currCat) => {
            for (let j = 0; j < currCat.length; j += 1) {
              store.stats.push({

                word: currCat[j].word,
                category: cats[i],
                translate: currCat[j].translate,
                trainCnt: 0,
                successCnt: 0,
                failureCnt: 0,
                guessPercent: 0,

              });

              // Save store
              if (i === cats.length - 1 && j === currCat.length - 1) {
                storage.setItem('eugenemp-efk', JSON.stringify(store));
              }
            }
          });
      }
    });
}

export {
  openStorage,
  clearStorage,
  initStats,
};
