import { atom } from 'jotai';

const localStorageKey = 'original-destination';

// atomWithStorage doesn't erase localStorage while this is temporary state
export const originalDestinationAtom = atom<string | null, string>(
  (_get) => {
    const fromLocalStorage = localStorage.getItem(localStorageKey);
    localStorage.removeItem(localStorageKey);

    return fromLocalStorage;
  },
  (_get, _set, newOriginalLocation) => {
    localStorage.setItem(localStorageKey, newOriginalLocation);
  }
);
