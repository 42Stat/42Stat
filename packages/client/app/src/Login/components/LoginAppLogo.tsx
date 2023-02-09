import { css } from '@emotion/react';
import { AppLogoSvg } from '../../assets/AppLogoSvg';
import { StyleDefine } from '../../styles/StyleDefine';
import { mediaQuery } from '../mediaQuery';

export const LoginAppLogo = () => {
  return (
    <div css={appLogoContainerStyle}>
      <AppLogoSvg css={appLogoStyle} className="LoginAppLogo" />
    </div>
  );
};

const appLogoContainerStyle = css({
  display: 'flex',
  justifyContent: 'center',
  padding: '9rem 0 9rem 0',
});

const appLogoStyle = mediaQuery({
  width: ['280px', '184px'],
  height: '127px',
  fill: StyleDefine.colors.textHighEmphasis,
});
