import { css } from '@emotion/react';
import { useAtomValue } from 'jotai';
import { StyleDefine } from '../../styles/StyleDefine';
import { displayHelpAtom } from '../atoms/displayHelpAtom';
import { mediaQuery } from '../mediaQuery';

export const Help = () => {
  const displayHelp = useAtomValue(displayHelpAtom);

  const helpStyle = mediaQuery({
    display: `${displayHelp === true ? 'block' : 'none'}`,
    color: StyleDefine.colors.textHighEmphasis,
    fontSize: StyleDefine.fontSize.fs12,
    padding: ['3rem 3rem 0 3rem', '1rem 1rem 0 1rem'],
    margin: 'auto',
    boxSizing: 'border-box',
  });

  return (
    <div css={helpStyle}>
      <p>
        구글 계정으로 로그인 후, 42 계정으로 최초 1회만 인증하면 사용
        가능합니다!
      </p>
      <br />
      <p>기타 문의는:</p>
      <ul>
        <li css={listStyle}>dha, jaham에게 42born2code 슬랙 DM</li>
        <li css={listStyle}>42statistics@gmail.com 으로 메일</li>
      </ul>
    </div>
  );
};

const listStyle = css({
  listStyle: 'disc',
  marginLeft: '1.8rem',
});
