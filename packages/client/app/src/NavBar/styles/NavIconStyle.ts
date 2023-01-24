import { css } from '@emotion/react';
import { StyleDefine } from '../../styles/StyleDefine';

export const NavIconStyle = css({
  margin: '0 0.5rem 0 0.5rem',
  fill: StyleDefine.colors.onSurface,
  ':hover': {
    cursor: 'pointer',
  },
});
