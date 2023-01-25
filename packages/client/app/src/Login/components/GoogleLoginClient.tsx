import { useGoogleButtonDiv } from '../hooks/useGoogleButtonDiv';
import { googleButtonWidthRange } from '../hooks/useGoogleButtonWidth';
import { mediaQuery } from '../mediaQuery';

export const GoogleLoginClient = () => {
  const googleButtonDiv = useGoogleButtonDiv();

  return googleButtonDiv ? (
    <div css={googleLoginButtonStyle} ref={googleButtonDiv} />
  ) : null;
};

const googleLoginButtonStyle = mediaQuery({
  // todo: switch to modal..? link..?
  margin: 'auto',
  width: googleButtonWidthRange,
});
