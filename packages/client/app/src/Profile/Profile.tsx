import * as React from 'react';
import { css } from '@emotion/react';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../axiosConfig';
import { useLogout } from '../Logout/hooks/useLogout';
import { Logout } from '../Logout/Logout';

export const Profile = () => {
  const logout = useLogout();

  // const query = useQuery({ queryKey: ['profile'], queryFn: requestProfile });

  // if (query.isError) {
  //   throw query.error;
  // }

  const handleLogoutButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    logout();
  };

  return (
    <>
      <div
        css={css`
          color: white;
        `}
      >
        profile
      </div>
      <button css={logoutButtonStyle} onClick={handleLogoutButtonClick}>
        logout
      </button>
    </>
  );
};

const requestProfile = async () => {
  await axiosInstance.get('/profile');
};

const logoutButtonStyle = css({
  width: '100px',
  height: '100px',
  backgroundColor: 'gray',
});
