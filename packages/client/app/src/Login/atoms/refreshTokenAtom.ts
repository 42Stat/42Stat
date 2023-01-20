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

/**
 * @description derived from refreshTokenAtom.
 */
export const needLoginAtom = atom<boolean>((get) => {
  const refreshToken = get(refreshTokenAtom);
  return !hasState(refreshToken);
});

// utils

const hasState = (atom: string | null) => {
  return atom !== null;
};

/**
 * @description use only in axios interceptors.
 */
export const localRefreshToken = {
  get: () => localStorage.getItem(localStorageKey),
  set: (newRefreshToken: string) =>
    localStorage.setItem(localStorageKey, newRefreshToken),
} as const;
