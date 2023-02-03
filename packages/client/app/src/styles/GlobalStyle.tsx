import { css, Global } from '@emotion/react';
import { StyleDefine } from './StyleDefine';

/* http://meyerweb.com/eric/tools/css/reset/ 
 v2.0 | 20110126
 License: none (public domain)
*/
const globalStyle = css`
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1.2;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  @font-face {
    font-family: 'inconsolata';
    font-weight: 200 900;
    src: url('/fonts/Inconsolata/Inconsolata-VariableFont_wdth\,wght.ttf');
  }

  * {
    font-size: ${StyleDefine.fontSize.fs10};
    font-family: ${StyleDefine.fontFamily};
    font-weight: ${StyleDefine.fontWeight.light};
  }

  html,
  body,
  #root {
    width: 100%;
    height: 100%;
    background-color: ${StyleDefine.colors.background};
  }
`;

export const GlobalStyle = () => {
  return <Global styles={globalStyle} />;
};
