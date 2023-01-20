import { css } from '@emotion/react';
import { Navigate, useRouteError } from 'react-router-dom';
import { StyleDefine } from '../styles/StyleDefine';
import { AxiosError } from 'axios';
import { RouteList } from '../AppRouter';
import { useSetAtom } from 'jotai';
import { needFtOAuthAtom } from '../Login/atoms/needFtOAuthAtom';
import { googleCredentialAtom } from '../Login/atoms/googleCredentialAtom';

export const ErrorPage = () => {
  const error = useRouteError();
  const setGoogleCredential = useSetAtom(googleCredentialAtom);
  const setNeedFtOAuth = useSetAtom(needFtOAuthAtom);

  console.warn('logging error', error);

  if (error instanceof AxiosError) {
    if (error.response?.status === 401) {
      // force user to login again
      // todo: replace with useLogout();
      setGoogleCredential(null);
      return <Navigate to={RouteList.LOGIN} replace={true} />;
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
