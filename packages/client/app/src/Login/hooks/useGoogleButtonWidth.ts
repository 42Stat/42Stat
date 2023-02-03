import * as React from 'react';

/**
 * @description set initial button width, detect window resizing and set proper width with cooldown.
 */
export const useGoogleButtonWidth = (): googleButtonWidthType => {
  const [windowWidth, setWindowWidth] = React.useState<googleButtonWidthType>(
    selectGoogleButtonWidth(window.innerWidth)
  );

  React.useEffect(() => {
    const windowResizeHandler = async () => {
      window.removeEventListener('resize', windowResizeHandler);

      await new Promise((resolve) =>
        setTimeout(() => {
          window.addEventListener('resize', windowResizeHandler);

          setWindowWidth(selectGoogleButtonWidth(window.innerWidth));

          resolve(true);
        }, 500)
      );
    };

    // todo: resize event doesn't handle properly for chrome dev tools.
    window.addEventListener('resize', windowResizeHandler);

    return () => window.removeEventListener('resize', windowResizeHandler);
  }, [setWindowWidth]);

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
