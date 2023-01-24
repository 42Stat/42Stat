import * as React from 'react';
import { css } from '@emotion/react';
import { useSetAtom } from 'jotai';
import { SideMenuIconSvg } from '../../assets/SideMenuIconSvg';
import { StyleDefine } from '../../styles/StyleDefine';
import { isSideMenuToggledAtom } from '../atoms/isSideMenuToggledAtom';
import { SideMenuStyle } from '../styles/SideMenuStyle';

export const SideMenuToggler = () => {
  const setIsSideMenuToggled = useSetAtom(isSideMenuToggledAtom);

  const handleIconClick = (e: React.MouseEvent<HTMLOrSVGElement>) => {
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

const sideMenuTogglerIconStyle = css({
  width: SideMenuStyle.iconWidth,
  height: SideMenuStyle.menuHeight,
  fill: StyleDefine.colors.onSurface,
});
