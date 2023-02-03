import { css, keyframes } from '@emotion/react';
import { StyleDefine } from '../../../styles/StyleDefine';

const INTRA_PROFILE_LINK = (id: number) =>
  `https://profile.intra.42.fr/users/${id}`;

type Props = {
  id: number;
  login: string;
  coalitionColor: string;
};

export const UserLogin = ({ id, login, coalitionColor }: Props) => {
  // todo: seperate here
  const userLoginStyle = css({
    fontSize: StyleDefine.fontSize.fs16,
    color: StyleDefine.colors.textHighEmphasis,
    ':hover': {
      backgroundPosition: '0%',
      backgroundClip: 'text',
      backgroundImage: `linear-gradient(to right,
                        ${coalitionColor} 0%,
                        ${coalitionColor} 80%,
                        ${StyleDefine.colors.textHighEmphasis} 90%,
                        ${coalitionColor} 100%)`,
      backgroundSize: '500% 100%',
      // https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-text-fill-color
      WebkitTextFillColor: 'transparent',
      animation: `${textHoverAnimation} 8s linear infinite`,
    },
  });

  return (
    <a css={userProfileLinkStyle} href={INTRA_PROFILE_LINK(id)} target="_blank">
      <span css={userLoginStyle}>{login}</span>
    </a>
  );
};

const textHoverAnimation = keyframes`
  from {
    background-position: 0%;
  }
  to {
    background-position: -100%;
  }
`;

const userProfileLinkStyle = css({
  textDecoration: 'unset',
});
