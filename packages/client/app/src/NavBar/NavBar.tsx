import { css } from '@emotion/react';
import { StyleDefine } from '../styles/StyleDefine';
import { SideMenuToggler } from './components/SideMenuToggler';
import { SideMenuStyle } from './styles/SideMenuStyle';

export const NavBar = () => {
  return (
    <nav css={navBarBackgroundStyle}>
      <SideMenuToggler />
    </nav>
  );
};

const navBarBackgroundStyle = css({
  padding: '1rem 1rem 0 1rem',
  height: SideMenuStyle.menuHeight,
});
