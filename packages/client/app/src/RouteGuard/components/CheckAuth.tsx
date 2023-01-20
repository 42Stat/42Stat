import * as React from 'react';
import { useAtomValue } from 'jotai';
import { Outlet, useNavigate } from 'react-router-dom';
import { originalPathAtom } from '../atoms/originalPathAtom';
import { CheckLogin } from './CheckLogin';
import { CheckFtOAuth } from './CheckFtOAuth';

export const CheckAuth = () => {
  const originalPath = useAtomValue(originalPathAtom);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (hasOriginalPath(originalPath)) {
      navigate(originalPath);
    }
  }, [originalPath, navigate]);

  return (
    <CheckLogin>
      <CheckFtOAuth>
        <Outlet />
      </CheckFtOAuth>
    </CheckLogin>
  );
};

const hasOriginalPath = (
  originalPath: string | null
): originalPath is string => {
  return originalPath !== null;
};
