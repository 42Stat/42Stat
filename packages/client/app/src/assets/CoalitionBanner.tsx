import { css } from '@emotion/react';
import * as React from 'react';

type Props = {
  color: string;
  imageUrl: string;
};

export const CoalitionBanner = ({ color, imageUrl }: Props) => {
  const coalitionBannerStyle = React.useMemo(
    () => getCoalitionBannerStyle(color),
    [color]
  );

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        id="banner"
        x="0px"
        y="0px"
        viewBox="0 0 68 104"
        css={coalitionBannerStyle}
      >
        <g id="banner-content">
          <g
            id="UI-Intranet-banner-content"
            transform="translate(-96.000000, -60.000000)"
          >
            <g
              id="banner-content-g-1"
              transform="translate(96.000000, 60.000000)"
            >
              <polygon
                id="banner-content-polygon-1"
                points="0,0 0,80.5 34.3,104 68,80.5 68,0"
              ></polygon>
            </g>
          </g>
        </g>
      </svg>
      <img css={coalitionImageStyle} src={imageUrl} />
    </>
  );
};

const getCoalitionBannerStyle = (color: string) =>
  css({
    margin: '0 1rem 0 1rem',
    width: '40px',
    fill: color,
  });

const coalitionImageStyle = css({
  width: '40px',
  position: 'absolute',
  translate: '-56px 5px',
});
