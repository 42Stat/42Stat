import { atom } from 'jotai';

const refreshTokenBaseAtom = atom<string | null>(null);

const localStorageKey = 'refresh-token';

/**
 * @description use when manually set refresh token's localstorage. don't use directly except in axios interceptors.
 */
export const localRefreshToken = {
  get: () => localStorage.getItem(localStorageKey),
  set: (newRefreshToken: string) =>
    localStorage.setItem(localStorageKey, newRefreshToken),
  reset: () => localStorage.removeItem(localStorageKey),
} as const;

export const refreshTokenAtom = atom<string | null, string | null>(
  (get) => {
    const fromBaseAtom = get(refreshTokenBaseAtom);
    if (hasState(fromBaseAtom)) {
      return fromBaseAtom;
    }

    const fromLocalStorage = localStorage.getItem(localStorageKey);
    return fromLocalStorage;
  },
  (_get, set, newRefreshToken) => {
    if (isReset(newRefreshToken)) {
      localRefreshToken.reset();
      return;
    }

    localRefreshToken.set(newRefreshToken);
    set(refreshTokenBaseAtom, newRefreshToken);
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

const isReset = (newValue: string | null): newValue is null => {
  return newValue === null;
};
