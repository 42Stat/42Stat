import * as React from 'react';
import { googleButtonWidthType, selectGoogleButtonWidth } from '../mediaQuery';

export const useGoogleButtonWidth = (): googleButtonWidthType => {
  const [windowWidth, setWindowWidth] = React.useState<googleButtonWidthType>(
    selectGoogleButtonWidth(window.innerWidth)
  );

  React.useEffect(() => {
    const windowEventHandler = async () => {
      window.removeEventListener('resize', windowEventHandler);

      await new Promise((resolve) =>
        setTimeout(() => {
          addEventListener('resize', windowEventHandler);

          setWindowWidth(selectGoogleButtonWidth(window.innerWidth));

          resolve(true);
        }, 1000)
      );
    };

    window.addEventListener('resize', windowEventHandler);

    return () => window.removeEventListener('resize', windowEventHandler);
  }, [window.innerWidth]);

  return windowWidth;
};
