import * as React from 'react';
import { useLogout } from './hooks/useLogout';

interface LogoutProps {
  to?: string;
}

/**
 * @description wrapper of useLogout.
 */
export const Logout = ({ to }: LogoutProps) => {
  const logout = useLogout();

  React.useEffect(() => {
    logout(to);
  }, [logout]);

  // spinner?
  return <></>;
};
