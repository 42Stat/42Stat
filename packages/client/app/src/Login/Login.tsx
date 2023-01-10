import { StyleDefine } from '../styles/StyleDefine';
import { Children } from '../types/Children';
import { AbsCenter } from '../styles/AbsCenter';
import { LoginContent } from './components/LoginContent';
import { mediaQuery } from './mediaQuery';

export const Login = () => {
  return (
    <LoginBackground>
      <LoginContent />
    </LoginBackground>
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

const LoginBackground = ({ children }: Children) => {
  return (
    <AbsCenter css={loginContainerStyle} className="LoginBackground">
      {children}
    </AbsCenter>
  );
};
