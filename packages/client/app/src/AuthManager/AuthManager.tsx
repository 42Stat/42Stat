import * as React from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAtomValue, useSetAtom } from 'jotai';
import { refreshTokenAtom } from './atoms/refreshTokenAtom';
import { needFtOAuthAtom } from './atoms/needFtOAuthAtom';
import { originalDestinationAtom } from './atoms/originalDestinationAtom';
import { RouteList } from '../AppRouter';

/**
 * @description If user need auth, navigate to proper auth page. Otherwise, navigate to original destination
 * @returns \<Outlet />
 */
export const AuthManager = () => {
  const refreshToken = useAtomValue(refreshTokenAtom);
  const needFtOAuth = useAtomValue(needFtOAuthAtom);
  const setOriginalDestination = useSetAtom(originalDestinationAtom);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (
      needAuth(refreshToken, needFtOAuth) &&
      hasPathname(window.location.pathname)
    ) {
      setOriginalDestination(window.location.pathname);
    }
  }, [window.location.pathname, refreshToken, needFtOAuth, navigate]);

  return needLogin(refreshToken) ? (
    <Navigate to={RouteList.LOGIN} />
  ) : needFtOAuth ? (
    <Navigate to={RouteList.FTOAUTH} />
  ) : (
    <Outlet />
  );
};

/**
 * utils
 */

const needAuth = (refreshToken: string | null, needFtOAuth: boolean) => {
  return needLogin(refreshToken) || needFtOAuth;
};

const needLogin = (refreshToken: string | null) => {
  return !hasRefreshToken(refreshToken);
};

// todo: need new name...
const hasPathname = (pathname: string) => {
  return (
    pathname !== '' &&
    pathname !== '/' &&
    pathname !== RouteList.LOGIN &&
    pathname !== RouteList.FTOAUTH
  );
};

const hasRefreshToken = (refreshToken: string | null) => {
  return refreshToken !== null;
};
