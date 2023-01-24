import { css } from '@emotion/react';
import { useAtomValue } from 'jotai';
import { AppLogoSvg } from '../../assets/AppLogoSvg';
import { displayHelpAtom } from '../../Login/atoms/displayHelpAtom';
import { StyleDefine } from '../../styles/StyleDefine';
import { mediaQuery } from '../mediaQuery';
import { ReactChildren } from '../../types/ReactChildren';

export const FtOAuthAppLogo = () => {
  return (
    <AppLogoContainer>
      <AppLogoSvg css={appLogoStyle} className="FtOAuthAppLogo" />
    </AppLogoContainer>
  );
};

const AppLogoContainer = ({ children }: ReactChildren) => {
  const displayHelp = useAtomValue(displayHelpAtom);

  const AppLogoContainerStyle = css({
    display: `${displayHelp ? 'none' : 'flex'}`,
    justifyContent: 'center',
    padding: '9rem 0 7.5rem 0',
  });

  return <div css={AppLogoContainerStyle}>{children}</div>;
};

const appLogoStyle = mediaQuery({
  width: ['280px', '184px'],
  height: '127px',
  fill: StyleDefine.colors.textHighEmphasis,
});
