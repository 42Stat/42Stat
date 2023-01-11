import { atom } from 'jotai';

const googleCredentialBaseAtom = atom<CredentialResponse | null>(null);

export const googleCredentialAtom = atom<
  CredentialResponse | null,
  CredentialResponse
>(
  (get) => {
    const fromBaseAtom = get(googleCredentialBaseAtom);
    const fromLocalStorage = localStorage.getItem('google-credential');
    localStorage.removeItem('google-credential');

    if (fromBaseAtom !== null) {
      return fromBaseAtom;
    }

    if (fromLocalStorage !== null) {
      return JSON.parse(fromLocalStorage);
    }

    return null;
  },
  (_get, set, newCredential) => set(googleCredentialBaseAtom, newCredential)
);
