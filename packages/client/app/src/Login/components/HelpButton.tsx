import { css } from '@emotion/react';
import { useAtom } from 'jotai';
import { StyleDefine } from '../../styles/StyleDefine';
import { displayHelpAtom } from '../atoms/displayHelpAtom';

export const HelpButton = () => {
  const [displayHelp, setDisplayHelp] = useAtom(displayHelpAtom);

  const handleHelpButtonClick = () => {
    setDisplayHelp((curr) => !curr);
  };

  return (
    <div css={helpButtonContainerStyle}>
      <button onClick={handleHelpButtonClick} css={helpButtonStyle}>
        {displayHelp ? 'back to login' : 'need help?'}
      </button>
    </div>
  );
};

const helpButtonContainerStyle = css({
  margin: 'auto',
});

const helpButtonStyle = css({
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  appearance: 'none',
  background: 'none',
  border: 'unset',
  padding: 'unset',
  color: StyleDefine.colors.textMediumEmphasis,
  ':hover': {
    cursor: 'pointer',
  },
});
