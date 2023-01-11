import facepaint from 'facepaint';

const breakpoints = ['750px', '450px'] as const;
export const mediaQuery = facepaint(
  breakpoints.map((bp) => `@media (max-width: ${bp})`)
);

// has shared value...
export const googleButtonWidthRange = ['400px', '280px', '200px'] as const;
export type googleButtonWidthType = typeof googleButtonWidthRange[number];
export const selectGoogleButtonWidth = (
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
