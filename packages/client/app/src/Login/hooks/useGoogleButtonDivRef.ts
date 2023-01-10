import * as React from 'react';
import { googleButtonWidthType } from '../mediaQuery';

import { useGoogleButtonWidth } from './useGoogleButtonWidth';
import { useGoogleScript } from './useGoogleScrpit';

export const useGoogleButtonDivRef = () => {
  const googleButtonDivRef = React.useRef<HTMLDivElement | null>(null);
  const { isLoaded, isError } = useGoogleScript();
  const googleButtonWidth = useGoogleButtonWidth();

  React.useEffect(() => {
    const googleRenderButtonOption =
      getGoogleRenderButtonOption(googleButtonWidth);

    if (isError === true) throw 'gapi script load fail';

    if (isLoaded === false || !window.google || !googleButtonDivRef.current)
      return;

    window.google.accounts.id.initialize(googleInitializeOption);

    window.google.accounts.id.renderButton(
      googleButtonDivRef.current,
      googleRenderButtonOption
    );

    window.google.accounts.id.prompt();
  }, [
    isLoaded,
    isError,
    window.google,
    window.innerWidth,
    googleButtonDivRef.current,
  ]);

  return googleButtonDivRef;
};

const googleInitializeOption: IdConfiguration = {
  client_id: import.meta.env.VITE_GAPI_CLIENT_ID,
  callback: (res) => {
    console.debug(res);
  },
  context: 'use',
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
