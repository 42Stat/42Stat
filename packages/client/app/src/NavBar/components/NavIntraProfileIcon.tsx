import * as React from 'react';
import { FtLogoSvg } from '../../assets/FtLogoSvg';
import { NavIconStyle } from '../styles/NavIconStyle';

export const NavIntraProfileIcon = () => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    window.location.href = 'https://profile.intra.42.fr';
  };

  return (
    <div onClick={handleClick}>
      <FtLogoSvg
        css={navIntraProfileMenuStyle}
        className="NavIntraProfileFtLogo"
      />
    </div>
  );
};

const navIntraProfileMenuStyle = NavIconStyle;
