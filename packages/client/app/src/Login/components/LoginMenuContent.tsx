import { css } from '@emotion/react';
import { mediaQuery } from '../mediaQuery';
import { GoogleLoginClient } from './GoogleLoginClient';
import { Help } from './Help';
import { HelpButton } from './HelpButton';
import { LoginAppLogo } from './LoginAppLogo';

export const LoginMenuContent = () => {
  return (
    <div css={loginMenuContentStyle}>
      <div css={upperGridAreaStyle}>
        <LoginAppLogo />
        <GoogleLoginClient />
        <Help />
      </div>
      <HelpButton />
    </div>
  );
};

const loginMenuContentStyle = mediaQuery({
  display: 'grid',
  gridTemplateRows: ['563px 80px', '463px 80px'],
  margin: '0 auto 0 auto',
});

const upperGridAreaStyle = css({
  display: 'flex',
  flexDirection: 'column',
});
