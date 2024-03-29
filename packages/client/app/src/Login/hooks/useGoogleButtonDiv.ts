import { useSetAtom } from 'jotai';
import * as React from 'react';
import { googleCredentialAtom } from '../atoms/googleCredentialAtom';
import {
  googleButtonWidthType,
  useGoogleButtonWidth,
} from './useGoogleButtonWidth';
import { useGoogleScript } from './useGoogleScrpit';

/**
 * @description load google client script -> create div for button -> render google login menu.
 */
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

    if (isError) {
      throw 'gapi script load fail';
    }

    if (!isLoaded) {
      return;
    }

    if (!isGoogleScriptLoadSuccess(window.google)) {
      throw 'gapi script load fail';
    }

    if (!isDivElementRendered(googleButtonDiv.current)) {
      return;
    }

    window.google.accounts.id.initialize(googleInitializeOption);

    window.google.accounts.id.renderButton(
      googleButtonDiv.current,
      googleRenderButtonOption
    );

    window.google.accounts.id.prompt();
  }, [isLoaded, isError, googleButtonWidth, googleButtonDiv.current]);

  return googleButtonDiv;
};

const isGoogleScriptLoadSuccess = (
  googleObject: Google | undefined
): googleObject is Google => {
  return googleObject !== undefined;
};

const isDivElementRendered = (
  divRef: HTMLDivElement | null
): divRef is HTMLDivElement => {
  return divRef !== null;
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
