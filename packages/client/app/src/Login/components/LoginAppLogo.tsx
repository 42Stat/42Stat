import { css } from '@emotion/react';
import { StyleDefine } from '../../styles/StyleDefine';
import { JSXChildren } from '../../types/JSXChildren';
import { useAtomValue } from 'jotai';
import { displayHelpAtom } from '../atoms/displayHelpAtom';
import { AppLogoSvg } from '../../assets/AppLogoSvg';
import { mediaQuery } from '../mediaQuery';

export const LoginAppLogo = () => {
  return (
    <AppLogoContainer>
      <AppLogoSvg css={appLogoStyle} className="LoginAppLogo" />
    </AppLogoContainer>
  );
};

const AppLogoContainer = ({ children }: JSXChildren) => {
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
