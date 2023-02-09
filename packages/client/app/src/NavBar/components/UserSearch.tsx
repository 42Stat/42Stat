import * as React from 'react';
import { StyleDefine } from '../../styles/StyleDefine';
import { useDebounceUserSearch } from '../hooks/useDebounceUserSearch';
import { mediaQuery } from '../styles/mediaQuery';
import { SearchPreview } from './SearchPreview';

export const UserSearch = () => {
  const [input, setInput] = React.useState('');
  const { userSearchQuery, debounceSearch } = useDebounceUserSearch(input);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInput(e.target.value);
    debounceSearch();
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (isEnterKeyReleased(e)) {
      // move to search result page
    }
  };

  return (
    <>
      <input
        css={userSearchInputStyle}
        placeholder="search..."
        value={input}
        spellCheck={false}
        type="text"
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      />
      <SearchPreview userSearchQuery={userSearchQuery} />
    </>
  );
};

const isEnterKeyReleased = (e: React.KeyboardEvent<HTMLInputElement>) => {
  return e.key === 'Enter';
};

const userSearchInputStyle = mediaQuery({
  width: '100%',
  height: '2rem',
  border: 'unset',
  padding: 'unset',
  margin: ['0 0 0 1rem', '0 0 0 0.5rem'],
  backgroundColor: StyleDefine.colors.dp00,
  outline: 'none',
  color: StyleDefine.colors.textHighEmphasis,
  fontSize: [StyleDefine.fontSize.fs12, StyleDefine.fontSize.fs12],
  ':hover': {
    '::placeholder': {
      color: `${StyleDefine.colors.textMediumEmphasis}`,
    },
  },
  '::placeholder': {
    color: `${StyleDefine.colors.textLowEmphasis}`,
  },
});
