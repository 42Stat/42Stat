import { css } from '@emotion/react';
import { useAtomValue } from 'jotai';
import { displayHelpAtom } from '../../Login/atoms/displayHelpAtom';
import { StyleDefine } from '../../styles/StyleDefine';
import { mediaQuery } from '../mediaQuery';
import { FtOAuthNotification } from './FtOAuthNotification';

export const FtOAuthClient = () => {
  const displayHelp = useAtomValue(displayHelpAtom);
  const ftOAuthButtonStyle = getFtOAuthButtonStyle(displayHelp);

  return (
    <div css={ftOAuthClientContainerStyle}>
      <FtOAuthNotification />
      <a
        css={ftOAuthButtonStyle}
        href={`${import.meta.env.VITE_BACKEND_EP}/auth/ft-oauth`}
      >
        <span css={style}>Go to 42</span>
      </a>
    </div>
  );
};

const ftOAuthClientContainerStyle = css({
  display: 'flex',
  justifyContent: 'center',
  height: '100%',
  flexDirection: 'column',
});

const getFtOAuthButtonStyle = (displayHelp: boolean) => {
  return mediaQuery({
    // todo: switch to modal..? link..?
    display: `${displayHelp ? 'none' : 'flex'}`,
    margin: '0.5rem auto 0 auto',
    width: ['400px', '280px', '200px'],
    height: '40px',
    backgroundColor: StyleDefine.colors.ftTheme,
    ':hover': {
      cursor: 'pointer',
      backgroundColor: StyleDefine.colors.ftThemeDark,
    },
    textDecoration: 'unset',
  });
};

const style = css({
  fontSize: StyleDefine.fontSize.fs14,
  fontFamily: StyleDefine.fontFamily.bold,
  color: StyleDefine.colors.textHighEmphasis,
  margin: 'auto',
});
