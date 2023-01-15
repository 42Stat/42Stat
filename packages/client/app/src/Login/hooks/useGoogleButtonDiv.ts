import { useSetAtom } from 'jotai';
import * as React from 'react';
import { googleCredentialAtom } from '../atoms/googleCredentialAtom';
import { googleButtonWidthType } from '../mediaQuery';
import { useGoogleButtonWidth } from './useGoogleButtonWidth';
import { useGoogleScript } from './useGoogleScrpit';

export const useGoogleButtonDiv = () => {
  const googleButtonDiv = React.useRef<HTMLDivElement | null>(null);
  const { isLoaded, isError } = useGoogleScript();
  const googleButtonWidth = useGoogleButtonWidth();
  const setGoogleCredentialAtom = useSetAtom(googleCredentialAtom);

  const googleInitializeOption: IdConfiguration = {
    client_id: import.meta.env.VITE_GAPI_CLIENT_ID,
    callback: (res) => {
      setGoogleCredentialAtom(res);
    },
    context: 'use',
  };

  React.useEffect(() => {
    const googleRenderButtonOption =
      getGoogleRenderButtonOption(googleButtonWidth);

    if (isError === true) throw 'gapi script load fail';

    if (isLoaded === false || !window.google || !googleButtonDiv.current)
      return;

    window.google.accounts.id.initialize(googleInitializeOption);

    window.google.accounts.id.renderButton(
      googleButtonDiv.current,
      googleRenderButtonOption
    );

    window.google.accounts.id.prompt();
  }, [
    isLoaded,
    isError,
    window.google,
    window.innerWidth,
    googleButtonDiv.current,
  ]);

  return googleButtonDiv;
};

const getGoogleRenderButtonOption = (
  width: googleButtonWidthType
): GsiButtonConfiguration => ({
  type: 'standard',
  theme: 'filled_black',
  size: 'large',
  text: 'continue_with',
  shape: 'pill',
  local: 'ko_Kr',
  width: width,
});