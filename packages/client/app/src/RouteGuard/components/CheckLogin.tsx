import { useAtomValue } from 'jotai';
import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { RouteList } from '../../App';
import { needLoginAtom } from '../../Login/atoms/refreshTokenAtom';
import { ReactChildren } from '../../types/ReactChildren';
import { useSetOriginalPath } from '../hooks/useSetOriginalPath';

export const CheckLogin = ({ children }: ReactChildren) => {
  const needLogin = useAtomValue(needLoginAtom);
  const setOriginalPath = useSetOriginalPath();

  React.useEffect(() => {
    if (needLogin) {
      setOriginalPath();
    }
  }, [needLogin, setOriginalPath]);

  return needLogin ? <Navigate to={RouteList.LOGIN} /> : <>{children}</>;
};
