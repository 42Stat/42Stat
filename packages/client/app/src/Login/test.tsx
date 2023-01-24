import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { LoginMenu } from './components/LoginMenu';

describe('LoginMenu component', () => {
  it('has 42 logo', () => {
    const rendered = render(<LoginMenu />);
    expect(rendered.getByTitle('ftLogoSvg')).toBeInTheDocument();
  });

  it.concurrent('has Service title', () => {
    const rendered = render(<LoginMenu />);
    expect(rendered.getByText('stat')).toBeInTheDocument();
  });

  it.concurrent('has display help button', () => {
    const rendered = render(<LoginMenu />);
    expect(
      rendered.getByText('need help?', { selector: 'button' })
    ).toBeInTheDocument();
  });
});

// todo: add tests for get and set credentials
