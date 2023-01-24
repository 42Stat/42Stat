import { css } from '@emotion/react';
import * as React from 'react';
import { LogoutSvg } from '../../assets/LogoutSvg';
import { useLogout } from '../../Logout/hooks/useLogout';
import { NavIconStyle } from '../styles/NavIconStyle';

export const LogoutIcon = () => {
  const logout = useLogout();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    logout();
  };

  return (
    <div onClick={handleClick}>
      <LogoutSvg css={logoutIconStyle} className="LogoutIcon" />
    </div>
  );
};

const logoutIconStyle = css(
  {
    width: '1.8rem',
    height: '2rem',
  },
  NavIconStyle
);
