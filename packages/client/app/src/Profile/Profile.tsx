import * as React from 'react';
import { css } from '@emotion/react';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../axiosConfig';

export const Profile = () => {
  // const query = useQuery({ queryKey: ['profile'], queryFn: requestProfile });

  // if (query.isError) {
  //   throw query.error;
  // }

  return (
    <div
      css={css`
        color: white;
      `}
    >
      profile
    </div>
  );
};

const requestProfile = async () => {
  await axiosInstance.get('/profile');
};
