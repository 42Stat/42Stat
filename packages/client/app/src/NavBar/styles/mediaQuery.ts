import facepaint from 'facepaint';

const breakpoints = ['450px'];
export const mediaQuery = facepaint(
  breakpoints.map((bp) => `@media (max-width: ${bp})`)
);
