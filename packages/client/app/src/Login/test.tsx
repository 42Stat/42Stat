import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { LoginMenuContainer } from './components/LoginMenuConatiner';

describe('LoginMenuContainer component', () => {
  it('has 42 logo', () => {
    const rendered = render(<LoginMenuContainer />);
    expect(rendered.getByTitle('ftLogoSvg')).toBeInTheDocument();
  });

  it.concurrent('has Service title', () => {
    const rendered = render(<LoginMenuContainer />);
    expect(rendered.getByText('stat')).toBeInTheDocument();
  });

  it.concurrent('has display help button', () => {
    const rendered = render(<LoginMenuContainer />);
    expect(
      rendered.getByText('need help?', { selector: 'button' })
    ).toBeInTheDocument();
  });
});

// todo: add tests for get and set credentials
