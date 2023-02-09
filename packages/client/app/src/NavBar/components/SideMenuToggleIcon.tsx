import { css } from '@emotion/react';
import { useSetAtom } from 'jotai';
import * as React from 'react';
import { SideMenuIconSvg } from '../../assets/SideMenuIconSvg';
import { isSideMenuToggledAtom } from '../../SideBar/atoms/isSideMenuToggledAtom';
import { NavIconStyle } from '../styles/NavIconStyle';

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
