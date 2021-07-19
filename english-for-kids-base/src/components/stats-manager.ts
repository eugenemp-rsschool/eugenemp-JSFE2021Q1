import {
  Stats,
  StatsElement,
  Store,
} from './interface';
import StatsTableElement from './view/stats-element';
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

function writeStatsToStorage(stats: Stats): void {
  const store: Store = { stats };

  storage.setItem('eugenemp-efk', JSON.stringify(store));
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
                trained: 0,
                success: 0,
                failure: 0,
                guess: 0,

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

// Reset table and redraw it
async function resetTable(): Promise<void> {
  await initStats();
  getTable();
}

// Assemble table from statistics
export type SortCol = 'word' | 'category' | 'translate' | 'trained' | 'success' | 'failure' | 'guess';
export type SortOrder = 'asc' | 'desc';

function getTable(sort?: SortCol, order?: SortOrder, tableBody?: HTMLElement): void {
  const tbody = tableBody || document.querySelector('.stats__table__body');
  const store = openStorage();
  const field = sort || 'word';

  function sortFn(a: StatsElement, b: StatsElement): number {
    if (order === 'desc') {
      if (a[field] > b[field]) return -1;
      if (a[field] < b[field]) return 1;
    } else {
      if (a[field] > b[field]) return 1;
      if (a[field] < b[field]) return -1;
    }
    return 0;
  }

  // Sort, if arg passed
  if (sort) store.stats.sort(sortFn);

  if (tbody) tbody.innerHTML = '';

  store.stats.forEach((word) => {
    tbody?.appendChild(new StatsTableElement(word).render());
  });
}

export {
  initStats,
  openStorage,
  clearStorage,
  writeStatsToStorage,
  resetTable,
  getTable,
};
