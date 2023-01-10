import { css } from '@emotion/react';
import { mediaQuery } from '../mediaQuery';
import { GoogleLoginButton } from './GoogleLoginButton';
import { Help } from './Help';
import { HelpButton } from './HelpButton';
import { LoginAppLogo } from './LoginAppLogo';

export const LoginContent = () => {
  return (
    <div css={loginContentStyle}>
      <div css={upperGridAreaStyle}>
        <LoginAppLogo />
        <GoogleLoginButton />
        <Help />
      </div>
      <HelpButton />
    </div>
  );
};

const loginContentStyle = mediaQuery({
  display: 'grid',
  gridTemplateRows: ['563px 80px', '463px 80px'],
  margin: '0 auto 0 auto',
});

const upperGridAreaStyle = css({
  display: 'flex',
  flexDirection: 'column',
});
