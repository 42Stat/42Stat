import { css } from '@emotion/react';
import { useAtomValue } from 'jotai';
import { displayHelpAtom } from '../atoms/displayHelpAtom';
import { mediaQuery } from '../mediaQuery';
import { GoogleLoginClient } from './GoogleLoginClient';
import { Help } from './Help';
import { HelpButton } from './HelpButton';
import { LoginAppLogo } from './LoginAppLogo';

export const LoginMenuContent = () => {
  const displayHelp = useAtomValue(displayHelpAtom);

  return (
    <div css={loginMenuContentStyle}>
      <div css={upperGridAreaStyle}>
        {displayHelp ? (
          <Help />
        ) : (
          <>
            <LoginAppLogo />
            <GoogleLoginClient />
          </>
        )}
      </div>
      <HelpButton />
    </div>
  );
};

const loginMenuContentStyle = mediaQuery({
  display: 'grid',
  // share predefined height [650, 600]
  gridTemplateRows: ['563px 80px', '463px 137px'],
  margin: '0 auto 0 auto',
});

const upperGridAreaStyle = css({
  display: 'flex',
  flexDirection: 'column',
});
