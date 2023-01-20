import * as React from 'react';
import { NavigateOptions } from 'react-router-dom';
import { useLogout } from './hooks/useLogout';

interface LogoutProps {
  to?: string;
  options?: NavigateOptions;
}

// todo: delete?
/**
 * @description wrapper for logout
 * @returns null
 */
export const Logout = ({ to, options }: LogoutProps) => {
  const logout = useLogout();

  React.useEffect(() => {
    logout(to, options);
  }, [to, options]);

  // spinner?
  return <></>;
};
