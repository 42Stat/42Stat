import { atom } from 'jotai';

const refreshTokenBaseAtom = atom<string | null>(null);

// todo: refactor here
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

export const needLoginAtom = atom<boolean>((get) => {
  const refreshToken = get(refreshTokenAtom);
  return !hasState(refreshToken);
});

const hasState = (atom: string | null) => {
  return atom !== null;
};
