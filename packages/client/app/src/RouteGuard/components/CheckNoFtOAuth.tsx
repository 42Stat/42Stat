import { useAtomValue } from 'jotai';
import { needFtOAuthAtom } from '../../Login/atoms/needFtOAuthAtom';
import { Navigate, Outlet } from 'react-router-dom';
import { RouteList } from '../../App';

export const CheckNoFtOAuth = () => {
  const needFtOAuth = useAtomValue(needFtOAuthAtom);

  return needFtOAuth ? <Outlet /> : <Navigate to={RouteList.ROOT} />;
};
