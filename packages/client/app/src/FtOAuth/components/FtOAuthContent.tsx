import { css } from '@emotion/react';
import { useAtomValue } from 'jotai';
import { displayHelpAtom } from '../../Login/atoms/displayHelpAtom';
import { Help } from '../../Login/components/Help';
import { HelpButton } from '../../Login/components/HelpButton';
import { mediaQuery } from '../../Login/mediaQuery';
import { FtOAuthAppLogo } from './FtOAuthAppLogo';
import { FtOAuthClient } from './FtOAuthClient';

export const FtOAuthContent = () => {
  const displayHelp = useAtomValue(displayHelpAtom);

  return (
    <div css={loginMenuContentStyle}>
      <div css={upperGridAreaStyle}>
        {displayHelp ? (
          <Help />
        ) : (
          <>
            <FtOAuthAppLogo />
            <FtOAuthClient />
          </>
        )}
      </div>
      <HelpButton />
    </div>
  );
};

const loginMenuContentStyle = mediaQuery({
  display: 'grid',
  // share predefined height (600px)
  gridTemplateRows: ['563px 80px', '463px 137px'],
  margin: '0 auto 0 auto',
});

const upperGridAreaStyle = css({
  display: 'flex',
  flexDirection: 'column',
});
