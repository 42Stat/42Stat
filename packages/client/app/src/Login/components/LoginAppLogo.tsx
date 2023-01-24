import { css } from '@emotion/react';
import { StyleDefine } from '../../styles/StyleDefine';
import { useAtomValue } from 'jotai';
import { displayHelpAtom } from '../atoms/displayHelpAtom';
import { AppLogoSvg } from '../../assets/AppLogoSvg';
import { mediaQuery } from '../mediaQuery';
import { ReactChildren } from '../../types/ReactChildren';

export const LoginAppLogo = () => {
  return (
    <AppLogoContainer>
      <AppLogoSvg css={appLogoStyle} className="LoginAppLogo" />
    </AppLogoContainer>
  );
};

const AppLogoContainer = ({ children }: ReactChildren) => {
  const displayHelp = useAtomValue(displayHelpAtom);

  const AppLogoContainerStyle = css({
    display: `${displayHelp ? 'none' : 'flex'}`,
    justifyContent: 'center',
    padding: '9rem 0 9rem 0',
  });

  return <div css={AppLogoContainerStyle}>{children}</div>;
};

const appLogoStyle = mediaQuery({
  width: ['280px', '184px'],
  height: '127px',
  fill: StyleDefine.colors.textHighEmphasis,
});
