import { StyleDefine } from '../styles/StyleDefine';
import { LogoutIcon } from './components/LogoutIcon';
import { NavHomeIcon } from './components/NavHomeIcon';
import { SearchUser } from './components/SearchUser';
import { SideMenuToggleIcon } from './components/SideMenuToggleIcon';
import { mediaQuery } from './styles/mediaQuery';

export const NavBar = () => {
  return (
    <nav css={navBarBackgroundStyle}>
      <SideMenuToggleIcon />
      <NavHomeIcon />
      <SearchUser />
      <LogoutIcon />
    </nav>
  );
};

const navBarBackgroundStyle = mediaQuery({
  display: 'flex',
  padding: ['1rem', '1rem 0.7rem 1rem 0.7rem'],
  height: '2rem',
  backgroundColor: StyleDefine.colors.dp03,
});
