import { useSetAtom } from 'jotai';
import { useLocation } from 'react-router-dom';
import { hasValidPath, originalPathAtom } from '../atoms/originalPathAtom';

export const useSetOriginalPath = () => {
  const setOriginalPath = useSetAtom(originalPathAtom);
  const { pathname } = useLocation();

  return () => {
    if (hasValidPath(pathname)) {
      setOriginalPath(pathname);
    }
  };
};
