import { useSetAtom } from 'jotai';
import * as React from 'react';
import { RouteList } from '../../App';
import { refreshTokenAtom } from '../../Login/atoms/refreshTokenAtom';

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
