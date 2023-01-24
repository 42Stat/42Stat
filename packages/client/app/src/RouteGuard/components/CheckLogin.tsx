import * as React from 'react';
import { useAtomValue } from 'jotai';
import { Navigate } from 'react-router-dom';
import { RouteList } from '../../App';
import { needLoginAtom } from '../../Login/atoms/refreshTokenAtom';
import { JSXChildren } from '../../types/JSXChildren';
import { useSetOriginalPath } from '../hooks/useSetOriginalPath';

export const CheckLogin = ({ children }: JSXChildren) => {
  const needLogin = useAtomValue(needLoginAtom);
  const setOriginalPath = useSetOriginalPath();

  React.useEffect(() => {
    if (needLogin) {
      setOriginalPath();
    }
  }, [needLogin, setOriginalPath]);

  return needLogin ? <Navigate to={RouteList.LOGIN} /> : children;
};
