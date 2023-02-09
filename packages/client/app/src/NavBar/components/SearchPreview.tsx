import { css } from '@emotion/react';
import { UseQueryResult } from '@tanstack/react-query';
import { LoadingSpinner } from '../../LoadingSpinner';
import { StyleDefine } from '../../styles/StyleDefine';
import { ResponseUserSearch, UserSearchResult } from '../api/requestUserSearch';
import { mediaQuery } from '../styles/mediaQuery';

type Props = {
  userSearchQuery: UseQueryResult<ResponseUserSearch, unknown>;
};

// todo: return is too complex...
export const SearchPreview = ({ userSearchQuery }: Props) => {
  // query disabled.
  if (!hasSearchTarget(userSearchQuery)) {
    return null;
  }

  return (
    <div css={searchPreviewContainerStyle}>
      {userSearchQuery.isLoading ? (
        <LoadingSpinner />
      ) : userSearchQuery.isError ? (
        <div>error while searching</div>
      ) : (
        // loaded
        <ul>
          {userSearchQuery.data.map((curr) => (
            <UserPreview key={curr.id} user={curr} />
          ))}
        </ul>
      )}
    </div>
  );
};

const hasSearchTarget = (userSearchQuery: UseQueryResult) => {
  return !(userSearchQuery.isLoading && !userSearchQuery.isFetching);
};

const searchPreviewContainerStyle = mediaQuery({
  backgroundColor: StyleDefine.colors.dp03,
  position: 'absolute',
  width: ['15rem', '280px'],
  top: '4rem',
  left: ['unset', '50%'],
  transform: ['unset', 'translate(-50%, 0)'],
  boxSizing: 'border-box',
  border: `solid 1px ${StyleDefine.colors.textLowEmphasis}`,
  boxShadow: `0 1rem 0.6rem ${StyleDefine.colors.background}`,
});

type UserSearchResultProps = {
  user: UserSearchResult;
};

// todo: add `fontFamily: bold' css for matching part?
const UserPreview = ({ user }: UserSearchResultProps) => {
  return (
    <li>
      <a css={userPreviewContainerStyle}>
        <img css={userPreviewImageStyle} src={user.imageUrl} />
        <span css={userPreviewLoginStyle}>{user.login}</span>
      </a>
    </li>
  );
};

const userPreviewContainerStyle = css({
  display: 'flex',
  alignItems: 'center',
  columnGap: '0.5rem',
  margin: '0.5rem',
});

const userPreviewImageStyle = css({
  width: '1.6rem',
  height: '1.6rem',
  borderRadius: '1rem',
});

const userPreviewLoginStyle = css({
  color: StyleDefine.colors.textMediumEmphasis,
  fontSize: StyleDefine.fontSize.fs16,
});
