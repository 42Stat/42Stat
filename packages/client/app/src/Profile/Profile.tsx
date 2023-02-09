import { css } from '@emotion/react';
import { NavBar } from '../NavBar/NavBar';
import { Summary } from './Summary/Summary';

export const Profile = () => {
  // const query = useQuery({ queryKey: ['profile'], queryFn: requestProfile });

  // if (query.isError) {
  //   throw query.error;
  // }

  return (
    <>
      <NavBar />
      <div css={profileContainerStyle}>
        <Summary />
      </div>
    </>
  );
};

const profileContainerStyle = css({
  // todo: 1520?
  maxWidth: '1200px',
  margin: 'auto',
  padding: '0 2rem 0 2rem',
  minHeight: 'calc(100% - 4rem)',
});
