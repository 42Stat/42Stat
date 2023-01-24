import { css } from '@emotion/react';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { RouteList } from '../../App';
import { AppLogoSvg } from '../../assets/AppLogoSvg';
import { NavIconStyle } from '../styles/NavIconStyle';

export const NavHomeIcon = () => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    navigate(RouteList.PROFILE);
  };

  return (
    <div onClick={handleClick}>
      <AppLogoSvg css={navHomeButtonStyle} className="NavHomeButtonIcon" />
    </div>
  );
};

const navHomeButtonStyle = css(
  {
    width: '3rem',
    height: '2rem',
  },
  NavIconStyle
);
