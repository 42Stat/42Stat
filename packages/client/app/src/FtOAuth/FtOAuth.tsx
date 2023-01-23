import { useAtomValue } from 'jotai';
import { Navigate } from 'react-router-dom';
import { RouteList } from '../AppRouter';
import { CheckLogin } from '../RouteGuard/components/CheckLogin';
import { needFtOAuthAtom } from '../Login/atoms/needFtOAuthAtom';
import { FtOAuthContent } from './components/FtOAuthContent';
import { mediaQuery } from './mediaQuery';
import { StyleDefine } from '../styles/StyleDefine';
import { JSXChildren } from '../types/JSXChildren';
import { AbsCenter } from '../styles/AbsCenter';

export const FtOAuth = () => {
  const needFtOAuth = useAtomValue(needFtOAuthAtom);

  if (!needFtOAuth) {
    return <Navigate to={RouteList.ROOT} />;
  }

  return (
    <CheckLogin>
      <FtOAuthBackground>
        <FtOAuthContent />
      </FtOAuthBackground>
    </CheckLogin>
  );
};

const FtOAuthBackground = ({ children }: JSXChildren) => {
  return (
    <AbsCenter css={ftOAuthBackgroundStyle} className="LoginMenuBackground">
      {children}
    </AbsCenter>
  );
};

const ftOAuthBackgroundStyle = mediaQuery({
  boxSizing: 'border-box',
  width: ['100%', '450px', '280px'],
  maxWidth: ['100%', '450px', '280px'],
  overFlowX: 'hidden',
  height: ['100%', '600px'],
  minHeight: '600px',
  borderRadius: '25px',
  backgroundColor: StyleDefine.colors.surface,
  display: 'flex',
  flexDirection: 'column',
  margin: 'auto',
});
