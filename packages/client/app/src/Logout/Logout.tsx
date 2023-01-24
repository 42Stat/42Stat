import * as React from 'react';
import { useLogout } from './hooks/useLogout';

interface Props {
  to?: string;
}

/**
 * @description wrapper of useLogout.
 */
export const Logout = ({ to }: Props) => {
  const logout = useLogout();

  React.useEffect(() => {
    logout(to);
  }, [logout]);

  // spinner?
  return <></>;
};
