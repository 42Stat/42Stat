import { StyleDefine } from '../styles/StyleDefine';
import { LogoutIcon } from './components/LogoutIcon';
import { NavHomeIcon } from './components/NavHomeIcon';
import { SideMenuToggleIcon } from './components/SideMenuToggleIcon';
import { UserSearch } from './components/UserSearch';
import { mediaQuery } from './styles/mediaQuery';

export const NavBar = () => {
  return (
    <nav css={navBarContainerStyle}>
      <SideMenuToggleIcon />
      <NavHomeIcon />
      <UserSearch />
      <LogoutIcon />
    </nav>
  );
};

const navBarContainerStyle = mediaQuery({
  display: 'flex',
  boxSizing: 'border-box',
  padding: ['1rem', '1rem 0.7rem 1rem 0.7rem'],
  width: '100%',
  height: '4rem',
  backgroundColor: StyleDefine.colors.dp03,
});
