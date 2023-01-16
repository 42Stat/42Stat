import * as React from 'react';

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

    // todo: need event listener for chorm dev tools and resizable display
    window.addEventListener('resize', windowEventHandler);

    return () => window.removeEventListener('resize', windowEventHandler);
  }, [window.innerWidth]);

  return windowWidth;
};

export const googleButtonWidthRange = ['400px', '280px', '200px'] as const;
export type googleButtonWidthType = typeof googleButtonWidthRange[number];
const selectGoogleButtonWidth = (
  windowWidth: number
): googleButtonWidthType => {
  if (windowWidth > 750) {
    return googleButtonWidthRange[0];
  }

  if (windowWidth > 450) {
    return googleButtonWidthRange[1];
  }

  return googleButtonWidthRange[2];
};
