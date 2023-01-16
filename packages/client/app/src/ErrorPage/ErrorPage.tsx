import { css } from '@emotion/react';
import { Navigate, useRouteError } from 'react-router-dom';
import { StyleDefine } from '../styles/StyleDefine';
import { AxiosError } from 'axios';
import { RouteList } from '../AppRouter';

export const ErrorPage = () => {
  const error = useRouteError();

  console.warn('logging error', error);

  if (error instanceof AxiosError) {
    if (error.response?.status === 401) {
      return <Navigate to={RouteList.LOGIN} replace={true} />;
    }

    if (error.response?.status === 403) {
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
