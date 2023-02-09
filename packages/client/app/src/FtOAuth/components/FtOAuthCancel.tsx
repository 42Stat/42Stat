import { css } from '@emotion/react';
import * as React from 'react';
import { useLogout } from '../../Logout/hooks/useLogout';
import { StyleDefine } from '../../styles/StyleDefine';

export const FtOAuthCancel = () => {
  const logout = useLogout();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    logout();
  };

  return (
    <div onClick={handleClick} css={ftOAuthCancelStyle}>
      {'< back'}
    </div>
  );
};

const ftOAuthCancelStyle = css({
  color: StyleDefine.colors.textMediumEmphasis,
  textDecoration: 'underline',
  transform: 'translate(0, 1rem)',
  alignSelf: 'center',
  ':hover': {
    cursor: 'pointer',
  },
});
