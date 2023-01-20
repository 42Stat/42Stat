import { useAtomValue } from 'jotai';
import { Navigate } from 'react-router-dom';
import { RouteList } from '../AppRouter';
import { CheckLogin } from '../RouteGuard/components/CheckLogin';
import { needFtOAuthAtom } from '../Login/atoms/needFtOAuthAtom';

export const FtOAuth = () => {
  const needFtOAuth = useAtomValue(needFtOAuthAtom);

  if (!needFtOAuth) {
    return <Navigate to={RouteList.ROOT} />;
  }

  return (
    <CheckLogin>
      <a href="http://localhost:3000/auth/ft-oauth">
        <button>asdfa</button>
      </a>
    </CheckLogin>
  );
};
