import { css } from '@emotion/react';
import { StyleDefine } from '../../../styles/StyleDefine';
import { RequestUserSummaryResponse } from '../../api/requestUserSummary';
import { UserCursusInfo } from './UserCursusInfo';
import { UserLogin } from './UserLogin';

type Props = {
  user: RequestUserSummaryResponse;
};

export const UserInfo = ({ user }: Props) => {
  return (
    <div css={userInfoContainerStyle}>
      <img css={userImageStyle} src={user.imageUrl} />
      <div>
        <UserLogin
          id={user.id}
          login={user.login}
          coalitionColor={user.coalition.color}
        />
        <div css={userNameStyle}>{user.name}</div>
        <UserCursusInfo
          rank={user.rank}
          level={user.level}
          grade={user.grade}
        />
      </div>
    </div>
  );
};

const userInfoContainerStyle = css({
  display: 'flex',
  color: StyleDefine.colors.textHighEmphasis,
  margin: '1rem',
});

const userImageStyle = css({
  width: '100px',
  height: '100px',
  borderRadius: '10%',
  overflow: 'hidden',
  objectFit: 'cover',
  marginRight: '1rem',
});

const userNameStyle = css({
  color: StyleDefine.colors.textLowEmphasis,
  marginTop: '0.5rem',
  fontSize: StyleDefine.fontSize.fs11,
});
