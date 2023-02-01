import { css } from '@emotion/react';
import { StyleDefine } from '../../../styles/StyleDefine';

// todo: consider use string type for props
type Props = {
  rank: number;
  level: number;
  grade: string;
};

export const UserCursusInfo = ({ rank, level, grade }: Props) => {
  return (
    <div css={userCursusInfoContainerStyle}>
      <Infos infoKey="42seoul " infoValue={`#${rank}`} />
      <Seperator />
      <Infos infoKey="Level " infoValue={`${level}`} />
      <Seperator />
      <Infos infoKey="Grade " infoValue={`${grade}`} />
    </div>
  );
};

const userCursusInfoContainerStyle = css({
  display: 'flex',
  flexWrap: 'wrap',
  marginTop: '0.2rem',
  fontSize: StyleDefine.fontSize.fs12,
});

type InfosProps = {
  infoKey: string;
  infoValue: string;
};

const Infos = ({ infoKey, infoValue }: InfosProps) => {
  const infoKeyStyle = css({
    color: StyleDefine.colors.textMediumEmphasis,
  });

  const infoValueStyle = css({
    color: StyleDefine.colors.primary,
  });

  return (
    <div>
      <span css={infoKeyStyle}>{infoKey}</span>
      <span css={infoValueStyle}>{infoValue}</span>
    </div>
  );
};

const Seperator = () => {
  const seperatorStyle = css({
    alignSelf: 'center',
    margin: '0 0.5rem 0 0.5rem',
    color: StyleDefine.colors.textLowEmphasis,
  });

  return <span css={seperatorStyle}>-</span>;
};
