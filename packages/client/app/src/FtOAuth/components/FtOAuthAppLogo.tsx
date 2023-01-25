import { css } from '@emotion/react';
import { AppLogoSvg } from '../../assets/AppLogoSvg';
import { StyleDefine } from '../../styles/StyleDefine';
import { mediaQuery } from '../mediaQuery';

export const FtOAuthAppLogo = () => {
  return (
    <div css={AppLogoContainerStyle}>
      <AppLogoSvg css={appLogoStyle} className="FtOAuthAppLogo" />
    </div>
  );
};

const AppLogoContainerStyle = css({
  display: 'flex',
  justifyContent: 'center',
  padding: '9rem 0 7.5rem 0',
});

const appLogoStyle = mediaQuery({
  width: ['280px', '184px'],
  height: '127px',
  fill: StyleDefine.colors.textHighEmphasis,
});
