import * as React from 'react';
import { useSetAtom } from 'jotai';
import { needFtOAuthAtom } from '../../Login/atoms/needFtOAuthAtom';
import { refreshTokenAtom } from '../../Login/atoms/refreshTokenAtom';
import { NavigateOptions, useNavigate } from 'react-router-dom';
import { RouteList } from '../../AppRouter';
import { googleCredentialAtom } from '../../Login/atoms/googleCredentialAtom';

export const useLogout = () => {
  const setGoogleCredential = useSetAtom(googleCredentialAtom);
  const setRefreshToken = useSetAtom(refreshTokenAtom);
  const setNeedFtOAuth = useSetAtom(needFtOAuthAtom);
  const navigate = useNavigate();

  const logout = React.useCallback(
    (to?: string, options?: NavigateOptions) => {
      setGoogleCredential(null);
      setRefreshToken(null);
      setNeedFtOAuth(false);
      // todo: navigate not working here
      navigate(to || RouteList.ROOT, options);
      console.log(to || RouteList.ROOT, options);
    },
    [setGoogleCredential, setRefreshToken, setNeedFtOAuth, navigate]
  );

  return logout;
};
