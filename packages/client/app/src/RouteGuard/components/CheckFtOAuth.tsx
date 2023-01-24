import * as React from 'react';
import { useAtomValue } from 'jotai';
import { Navigate } from 'react-router-dom';
import { RouteList } from '../../App';
import { needFtOAuthAtom } from '../../Login/atoms/needFtOAuthAtom';
import { useSetOriginalPath } from '../hooks/useSetOriginalPath';
import { ReactChildren } from '../../types/ReactChildren';

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
