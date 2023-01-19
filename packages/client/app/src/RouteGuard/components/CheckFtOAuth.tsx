import * as React from 'react';
import { useAtomValue } from 'jotai';
import { Navigate } from 'react-router-dom';
import { RouteList } from '../../AppRouter';
import { needFtOAuthAtom } from '../../Login/atoms/needFtOAuthAtom';
import { JSXChildren } from '../../types/JSXChildren';
import { useSetOriginalPath } from '../hooks/useSetOriginalPath';

// todo?: refactor to single component?
export const CheckFtOAuth = ({ children }: JSXChildren) => {
  const needFtOAuth = useAtomValue(needFtOAuthAtom);
  const setOriginalPath = useSetOriginalPath();

  React.useEffect(() => {
    if (needFtOAuth) {
      setOriginalPath();
    }
  }, [needFtOAuth, setOriginalPath]);

  return needFtOAuth ? <Navigate to={RouteList.FTOAUTH} /> : children;
};
