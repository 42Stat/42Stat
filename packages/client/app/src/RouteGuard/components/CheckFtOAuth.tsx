import { useAtomValue } from 'jotai';
import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { RouteList } from '../../App';
import { needFtOAuthAtom } from '../../Login/atoms/needFtOAuthAtom';
import { ReactChildren } from '../../types/ReactChildren';
import { useSetOriginalPath } from '../hooks/useSetOriginalPath';

// todo?: refactor to single component?
export const CheckFtOAuth = ({ children }: ReactChildren) => {
  const needFtOAuth = useAtomValue(needFtOAuthAtom);
  const setOriginalPath = useSetOriginalPath();

  React.useEffect(() => {
    if (needFtOAuth) {
      setOriginalPath();
    }
  }, [needFtOAuth, setOriginalPath]);

  return needFtOAuth ? <Navigate to={RouteList.FTOAUTH} /> : children;
};
