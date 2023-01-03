import * as React from 'react';
import { Outlet } from 'react-router-dom';

// todo: if there's no need for this, delete
export const Root: React.FC = (): React.ReactElement => {
  return (
    <>
      <Outlet />
    </>
  );
};
