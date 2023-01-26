import { css } from '@emotion/react';
import { StyleDefine } from '../../styles/StyleDefine';
import { mediaQuery } from '../mediaQuery';
import { FtOAuthCancel } from './FtOAuthCancel';
import { FtOAuthNotification } from './FtOAuthNotification';

export const FtOAuthClient = () => {
  return (
    <div css={ftOAuthClientContainerStyle}>
      <FtOAuthNotification />
      <a
        css={ftOAuthButtonStyle}
        href={`${import.meta.env.VITE_BACKEND_EP}/auth/ft-oauth`}
      >
        <span css={ftOAuthTextStyle}>Go to 42</span>
      </a>
      <FtOAuthCancel />
    </div>
  );
};

const ftOAuthClientContainerStyle = css({
  display: 'flex',
  justifyContent: 'center',
  height: '100%',
  flexDirection: 'column',
});

const ftOAuthButtonStyle = mediaQuery({
  // todo: switch to modal..? link..?
  display: 'flex',
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

const ftOAuthTextStyle = css({
  fontSize: StyleDefine.fontSize.fs14,
  fontFamily: StyleDefine.fontFamily.bold,
  color: StyleDefine.colors.textHighEmphasis,
  margin: 'auto',
});
