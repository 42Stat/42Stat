import { useAtomValue } from 'jotai';
import { Navigate } from 'react-router-dom';
import { RouteList } from '../App';
import { CheckLogin } from '../RouteGuard/components/CheckLogin';
import { needFtOAuthAtom } from '../Login/atoms/needFtOAuthAtom';
import { FtOAuthContent } from './components/FtOAuthContent';
import { mediaQuery } from './mediaQuery';
import { StyleDefine } from '../styles/StyleDefine';
import { css } from '@emotion/react';

export const FtOAuth = () => {
  const needFtOAuth = useAtomValue(needFtOAuthAtom);

  if (!needFtOAuth) {
    return <Navigate to={RouteList.ROOT} />;
  }

  return (
    <CheckLogin>
      <div css={ftOAuthContainerStyle}>
        <div css={ftOAuthBackgroundStyle}>
          <FtOAuthContent />
        </div>
      </div>
    </CheckLogin>
  );
};

const ftOAuthContainerStyle = css({
  display: 'flex',
  width: '100%',
  height: '100%',
});

const ftOAuthBackgroundStyle = mediaQuery({
  width: ['100%', '450px', '280px'],
  maxWidth: ['100%', '450px', '280px'],
  overFlowX: 'hidden',
  height: ['100%', '600px'],
  minHeight: '600px',
  borderRadius: ['0px', '25px'],
  backgroundColor: StyleDefine.colors.surface,
  display: 'flex',
  flexDirection: 'column',
  margin: 'auto',
});
