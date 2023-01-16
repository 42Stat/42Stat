import { StyleDefine } from '../../styles/StyleDefine';
import { Children } from '../../types/Children';
import { AbsCenter } from '../../styles/AbsCenter';
import { LoginMenuContent } from './LoginMenuContent';
import { mediaQuery } from '../mediaQuery';

export const LoginMenuContainer = () => {
  return (
    <LoginMenuBackground>
      <LoginMenuContent />
    </LoginMenuBackground>
  );
};

const loginContainerStyle = mediaQuery({
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

const LoginMenuBackground = ({ children }: Children) => {
  return (
    <AbsCenter css={loginContainerStyle} className="LoginMenuBackground">
      {children}
    </AbsCenter>
  );
};
