import facepaint from 'facepaint';

const breakpoints = ['750px', '450px'] as const;
export const mediaQuery = facepaint(
  breakpoints.map((bp) => `@media (max-width: ${bp})`)
);
