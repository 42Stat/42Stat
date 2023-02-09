import { css } from '@emotion/react';
import { AxiosError } from 'axios';
import { useSetAtom } from 'jotai';
import { Navigate, useRouteError } from 'react-router-dom';
import { RouteList } from '../App';
import { needFtOAuthAtom } from '../Login/atoms/needFtOAuthAtom';
import { Logout } from '../Logout/Logout';
import { StyleDefine } from '../styles/StyleDefine';

export const ErrorPage = () => {
  const error = useRouteError();
  const setNeedFtOAuth = useSetAtom(needFtOAuthAtom);

  console.warn('logging error', error);

  if (isAxiosResponseError(error)) {
    if (error.response?.status === 401) {
      return <Logout />;
    }

    if (error.response?.status === 403) {
      setNeedFtOAuth(true);
      return <Navigate to={RouteList.FTOAUTH} replace={true} />;
    }
  }

  return (
    <div
      css={css`
        color: ${StyleDefine.colors.textHighEmphasis};
      `}
    >
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>{`Error: ${error}`}</p>
    </div>
  );
};

const isAxiosResponseError = (error: unknown): error is AxiosError => {
  return typeof error === 'object' && error !== null && 'response' in error;
};
