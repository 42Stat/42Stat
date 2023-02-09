import { css } from '@emotion/react';
import * as React from 'react';
import { CoalitionBanner } from '../../../assets/CoalitionBanner';
import { StyleDefine } from '../../../styles/StyleDefine';
import { CoalitionType } from '../../api/requestUserSummary';

type Props = {
  coalition: CoalitionType;
};

export const CoalitionInfo = ({ coalition }: Props) => {
  const coalitionNameStyle = React.useMemo(
    () => getCoalitionNameStyle(coalition.color),
    [coalition.color]
  );

  return (
    <div css={coalitionInfoConatinerStyle}>
      <div>
        <CoalitionBanner
          color={coalition.color}
          imageUrl={coalition.imageUrl}
        />
      </div>
      <div>
        <div css={coalitionNameStyle}>Gun</div>
        <div
          css={css`
            display: flex;
            flex-wrap: wrap;
          `}
        >
          <div css={dateKeyStyle}>Started at</div>
          <div css={dateValueStyle}>2022-11-08</div>
        </div>
        <div css={dayAfterDateStyle}>D+380</div>
      </div>
    </div>
  );
};

const coalitionInfoConatinerStyle = css({
  display: 'flex',
  padding: '0 1rem 0 1rem',
  margin: '1rem auto 1rem auto',
});

const getCoalitionNameStyle = (coalitionColor: string) => {
  return css({
    fontSize: StyleDefine.fontSize.fs16,
    fontWeight: StyleDefine.fontWeight.regular,
    color: coalitionColor,
  });
};

const dateKeyStyle = css({
  fontSize: StyleDefine.fontSize.fs11,
  color: StyleDefine.colors.textMediumEmphasis,
  marginRight: '0.5rem',
});

const dateValueStyle = css({
  fontSize: StyleDefine.fontSize.fs12,
  color: StyleDefine.colors.primary,
});

const dayAfterDateStyle = css({
  fontSize: StyleDefine.fontSize.fs12,
  color: StyleDefine.colors.primary,
});
