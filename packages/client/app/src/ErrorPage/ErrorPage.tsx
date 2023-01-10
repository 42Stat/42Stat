import * as React from 'react';
import { css } from '@emotion/react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { StyleDefine } from '../styles/StyleDefine';

export const ErrorPage: React.FC = (): React.ReactElement => {
  const error = useRouteError();
  console.warn(error);

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.data}</i>
        </p>
      </div>
    );
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
