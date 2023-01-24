import * as React from 'react';
import { useSetAtom } from 'jotai';
import { SideMenuIconSvg } from '../../assets/SideMenuIconSvg';
import { isSideMenuToggledAtom } from '../../SideBar/atoms/isSideMenuToggledAtom';
import { NavIconStyle } from '../styles/NavIconStyle';
import { css } from '@emotion/react';

export const SideMenuToggleIcon = () => {
  const setIsSideMenuToggled = useSetAtom(isSideMenuToggledAtom);

  const handleIconClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsSideMenuToggled(true);
  };

  return (
    <div onClick={handleIconClick}>
      <SideMenuIconSvg
        css={sideMenuTogglerIconStyle}
        className="SideMenuTogglerIcon"
      />
    </div>
  );
};

const sideMenuTogglerIconStyle = css(
  {
    width: '1.8rem',
    height: '2rem',
  },
  NavIconStyle
);
