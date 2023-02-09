import { useAtomValue } from 'jotai';
import * as React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { originalPathAtom } from '../atoms/originalPathAtom';
import { CheckFtOAuth } from './CheckFtOAuth';
import { CheckLogin } from './CheckLogin';

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
