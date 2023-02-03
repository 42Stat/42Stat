import { StyleDefine } from '../../styles/StyleDefine';
import { mediaQuery } from '../styles/mediaQuery';

export const SearchUserInput = () => {
  return <input css={searchUserInputStyle} placeholder="search..." />;
};

// todo: add hover effect
const searchUserInputStyle = mediaQuery({
  width: '100%',
  height: '2rem',
  border: 'unset',
  padding: 'unset',
  margin: ['0 0 0 1rem', '0 0 0 0.5rem'],
  backgroundColor: StyleDefine.colors.dp00,
  outline: 'none',
  color: StyleDefine.colors.textHighEmphasis,
  fontSize: [StyleDefine.fontSize.fs12, StyleDefine.fontSize.fs12],
});
