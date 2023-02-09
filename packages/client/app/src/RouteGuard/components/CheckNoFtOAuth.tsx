import { useAtomValue } from 'jotai';
import { Navigate, Outlet } from 'react-router-dom';
import { RouteList } from '../../App';
import { needFtOAuthAtom } from '../../Login/atoms/needFtOAuthAtom';

export const CheckNoFtOAuth = () => {
  const needFtOAuth = useAtomValue(needFtOAuthAtom);

  return needFtOAuth ? <Outlet /> : <Navigate to={RouteList.ROOT} />;
};
