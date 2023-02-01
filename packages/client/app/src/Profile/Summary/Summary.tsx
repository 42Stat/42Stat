import { css } from '@emotion/react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { LoadingSpinner } from '../../LoadingSpinner';
import { StyleDefine } from '../../styles/StyleDefine';
import { requestUserSummary } from '../api/requestUserSummary';
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
          <UserInfo user={userQuery.data} />
        )}
      </div>
    </div>
  );
};

const summaryContainerStyle = css({
  padding: '2rem 0 2rem 0',
});

const summaryBackgroundStyle = css({
  borderRadius: '0.3rem',
  backgroundColor: StyleDefine.colors.surface,
  display: 'flex',
});
