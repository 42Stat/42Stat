import { useAtomValue } from 'jotai';
import { displayHelpAtom } from '../atoms/displayHelpAtom';
import { useGoogleButtonDiv } from '../hooks/useGoogleButtonDiv';
import { googleButtonWidthRange } from '../hooks/useGoogleButtonWidth';
import { mediaQuery } from '../mediaQuery';

export const GoogleLoginClient = () => {
  const displayHelp = useAtomValue(displayHelpAtom);
  const googleButtonDiv = useGoogleButtonDiv();
  const googleLoginButtonStyle = getGoogleLoginButtonStyle(displayHelp);

  return googleButtonDiv ? (
    <div css={googleLoginButtonStyle} ref={googleButtonDiv} />
  ) : null;
};

const getGoogleLoginButtonStyle = (displayHelp: boolean) => {
  return mediaQuery({
    // todo: switch to modal..? link..?
    display: `${displayHelp ? 'none' : 'block'}`,
    margin: 'auto',
    width: googleButtonWidthRange,
  });
};
