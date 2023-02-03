import { css } from '@emotion/react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { LoadingSpinner } from '../../LoadingSpinner';
import { StyleDefine } from '../../styles/StyleDefine';
import { requestUserSummary } from '../api/requestUserSummary';
import { CoalitionInfo } from './components/CoalitionInfo';
import { UserInfo } from './components/UserInfo';

export const Summary = () => {
  const { id } = useParams();
  const userQuery = useQuery({
    queryKey: ['user', 'summary', `${id}`],
    queryFn: requestUserSummary,
  });

  if (userQuery.isError) {
    throw userQuery.error;
  }

  // todo: loading spinner width, height tweak
  return (
    <div css={summaryContainerStyle}>
      <div css={summaryBackgroundStyle}>
        {userQuery.isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <img css={userImageStyle} src={userQuery.data.imageUrl} />
            <UserInfo user={userQuery.data} />
            <CoalitionInfo coalition={userQuery.data.coalition} />
          </>
        )}
      </div>
    </div>
  );
};

const summaryContainerStyle = css({
  padding: '2rem 0 2rem 0',
});

const userImageStyle = css({
  width: '100px',
  height: '100px',
  borderRadius: '10%',
  overflow: 'hidden',
  objectFit: 'cover',
  margin: '1rem',
});

const summaryBackgroundStyle = css({
  borderRadius: '0.3rem',
  backgroundColor: StyleDefine.colors.surface,
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
});
