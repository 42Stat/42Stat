import { atom } from 'jotai';

const refreshTokenBaseAtom = atom<string | null>(null);

const localStorageKey = 'refresh-token';

export const refreshTokenAtom = atom<string | null, string>(
  (get) => {
    const fromBaseAtom = get(refreshTokenBaseAtom);
    if (hasState(fromBaseAtom)) {
      return fromBaseAtom;
    }

    const fromLocalStorage = localStorage.getItem(localStorageKey);
    return fromLocalStorage;
  },
  (_get, set, newRefreshTokn) => {
    localStorage.setItem(localStorageKey, newRefreshTokn);
    set(refreshTokenBaseAtom, newRefreshTokn);
  }
);

const hasState = (atom: string | null) => {
  return atom !== null;
};
