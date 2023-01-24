import { atom } from 'jotai';
import { RouteList } from '../../App';

const localStorageKey = 'original-path';

// atomWithStorage doesn't erase localStorage while this is temporary state
export const originalPathAtom = atom<string | null, string>(
  // eslint-disable-next-line
  (_get) => {
    const fromLocalStorage = localStorage.getItem(localStorageKey);
    localStorage.removeItem(localStorageKey);

    return fromLocalStorage;
  },
  (_get, _set, newPath) => {
    localStorage.setItem(localStorageKey, newPath);
  }
);

// todo: refactor 24, 25 to single key || value
export const hasValidPath = (path: string) => {
  return (
    path !== '' &&
    path !== '/' &&
    path !== RouteList.LOGIN &&
    path !== RouteList.FTOAUTH
  );
};
