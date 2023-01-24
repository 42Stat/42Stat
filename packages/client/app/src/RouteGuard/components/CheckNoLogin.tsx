import { useAtomValue } from 'jotai';
import { Navigate, Outlet } from 'react-router-dom';
import { RouteList } from '../../App';
import { needLoginAtom } from '../../Login/atoms/refreshTokenAtom';

export const CheckNoLogin = () => {
  const needLogin = useAtomValue(needLoginAtom);

  return needLogin ? <Outlet /> : <Navigate to={RouteList.ROOT} />;
};
