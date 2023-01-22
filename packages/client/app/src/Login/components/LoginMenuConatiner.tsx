import * as React from 'react';
import { StyleDefine } from '../../styles/StyleDefine';
import { JSXChildren } from '../../types/JSXChildren';
import { AbsCenter } from '../../styles/AbsCenter';
import { LoginMenuContent } from './LoginMenuContent';
import { mediaQuery } from '../mediaQuery';
import { useSetAtom } from 'jotai';
import { displayHelpAtom } from '../atoms/displayHelpAtom';

export const LoginMenuContainer = () => {
  const setDisplayHelp = useSetAtom(displayHelpAtom);

  React.useEffect(() => {
    return () => setDisplayHelp(false);
  }, [setDisplayHelp]);

  return (
    <LoginMenuBackground>
      <LoginMenuContent />
    </LoginMenuBackground>
  );
};

const LoginMenuBackground = ({ children }: JSXChildren) => {
  return (
    <AbsCenter css={loginBackgroundStyle} className="LoginMenuBackground">
      {children}
    </AbsCenter>
  );
};

const loginBackgroundStyle = mediaQuery({
  boxSizing: 'border-box',
  width: ['100%', '450px', '280px'],
  maxWidth: ['100%', '450px', '280px'],
  overFlowX: 'hidden',
  height: ['100%', '600px'],
  minHeight: '600px',
  borderRadius: '25px',
  backgroundColor: StyleDefine.colors.surface,
  display: 'flex',
  flexDirection: 'column',
  margin: 'auto',
});
