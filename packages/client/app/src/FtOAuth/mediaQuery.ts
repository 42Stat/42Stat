import facepaint from 'facepaint';

const breakpoints = ['750px', '450px'] as const;
// is same with Login
export const mediaQuery = facepaint(
  breakpoints.map((bp) => `@media (max-width: ${bp})`)
);
