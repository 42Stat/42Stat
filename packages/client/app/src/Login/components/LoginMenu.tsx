import * as React from 'react';
import { StyleDefine } from '../../styles/StyleDefine';
import { LoginMenuContent } from './LoginMenuContent';
import { mediaQuery } from '../mediaQuery';
import { useSetAtom } from 'jotai';
import { displayHelpAtom } from '../atoms/displayHelpAtom';
import { css } from '@emotion/react';

export const LoginMenu = () => {
  const setDisplayHelp = useSetAtom(displayHelpAtom);

  React.useEffect(() => {
    return () => setDisplayHelp(false);
  }, [setDisplayHelp]);

  return (
    <div css={loginContainerStyle}>
      <div css={loginBackgroundStyle}>
        <LoginMenuContent />
      </div>
    </div>
  );
};

const loginContainerStyle = css({
  display: 'flex',
  width: '100%',
  height: '100%',
});

const loginBackgroundStyle = mediaQuery({
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
