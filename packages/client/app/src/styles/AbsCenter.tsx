import { Children } from '../types/Children';
import { css } from '@emotion/react';
import { CssPropsClassName } from '../types/CssPropsClassName';

const absoluteCenterStyle = css({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});

export const AbsCenter = ({
  className,
  children,
}: CssPropsClassName & Children) => {
  return (
    <div css={absoluteCenterStyle} className={className}>
      {children}
    </div>
  );
};
