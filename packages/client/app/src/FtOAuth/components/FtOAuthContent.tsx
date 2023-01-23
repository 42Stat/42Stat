import { css } from '@emotion/react';
import { Help } from '../../Login/components/Help';
import { HelpButton } from '../../Login/components/HelpButton';
import { mediaQuery } from '../../Login/mediaQuery';
import { FtOAuthAppLogo } from './FtOAuthAppLogo';
import { FtOAuthClient } from './FtOAuthClient';

export const FtOAuthContent = () => {
  return (
    <div css={loginMenuContentStyle}>
      <div css={upperGridAreaStyle}>
        <FtOAuthAppLogo />
        <FtOAuthClient />
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
