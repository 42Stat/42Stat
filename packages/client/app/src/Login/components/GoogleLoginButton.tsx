import { useAtomValue } from 'jotai';
import { displayHelpAtom } from '../atoms/displayHelpAtom';
import { useGoogleButtonDiv } from '../hooks/useGoogleButtonDiv';
import { googleButtonWidthRange, mediaQuery } from '../mediaQuery';

export const GoogleLoginButton = () => {
  const displayHelp = useAtomValue(displayHelpAtom);
  const googleButtonDiv = useGoogleButtonDiv();
  const googleLoginButtonStyle = getGoogleLoginButtonStyle(displayHelp);

  return googleButtonDiv ? (
    <div css={googleLoginButtonStyle} ref={googleButtonDiv} />
  ) : null;
};

const getGoogleLoginButtonStyle = (displayHelp: boolean) => {
  return mediaQuery({
    display: `${displayHelp === true ? 'none' : 'block'}`,
    margin: 'auto',
    width: googleButtonWidthRange,
  });
};
