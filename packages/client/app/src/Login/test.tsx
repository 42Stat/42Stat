import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Login } from './Login';

describe('Login component', () => {
  it('has 42 logo', () => {
    const rendered = render(<Login />);
    expect(rendered.getByTitle('ftLogoSvg')).toBeInTheDocument();
  });

  it.concurrent('has Service title', () => {
    const rendered = render(<Login />);
    expect(rendered.getByText('stat')).toBeInTheDocument();
  });

  it.concurrent('has display help button', () => {
    const rendered = render(<Login />);
    expect(
      rendered.getByText('need help?', { selector: 'button' })
    ).toBeInTheDocument();
  });
});
