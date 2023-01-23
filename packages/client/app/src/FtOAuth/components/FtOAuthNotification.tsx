import { css } from '@emotion/react';
import { StyleDefine } from '../../styles/StyleDefine';

export const FtOAuthNotification = () => {
  return <div css={ftOAuthNotificationStyle}>Authorize 42 Once to use!</div>;
};

const ftOAuthNotificationStyle = css({
  color: StyleDefine.colors.textHighEmphasis,
  textAlign: 'center',
});
