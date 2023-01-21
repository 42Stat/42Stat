import * as React from 'react';
import { useSetAtom } from 'jotai';
import { refreshTokenAtom } from '../../Login/atoms/refreshTokenAtom';
import { RouteList } from '../../AppRouter';

export const useLogout = () => {
  const setRefreshToken = useSetAtom(refreshTokenAtom);

  const logout = React.useCallback(
    (to?: string) => {
      setRefreshToken(null);
      window.location.href = to ? to : RouteList.ROOT;
    },
    [setRefreshToken]
  );

  return logout;
};
