import { useAtomValue } from 'jotai';
import { displayHelpAtom } from '../atoms/displayHelpAtom';
import { useGoogleButtonDivRef } from '../hooks/useGoogleButtonDivRef';
import { googleButtonWidthRange, mediaQuery } from '../mediaQuery';

export const GoogleLoginButton = () => {
  const displayHelp = useAtomValue(displayHelpAtom);
  const googleButtonDivRef = useGoogleButtonDivRef();
  const googleLoginButtonStyle = getGoogleLoginButtonStyle(displayHelp);

  return googleButtonDivRef ? (
    <div css={googleLoginButtonStyle} ref={googleButtonDivRef} />
  ) : null;
};

const getGoogleLoginButtonStyle = (displayHelp: boolean) => {
  return mediaQuery({
    display: `${displayHelp === true ? 'none' : 'block'}`,
    margin: 'auto',
    width: googleButtonWidthRange,
  });
};
