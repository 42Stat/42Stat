export const StyleDefine = {
  colors: {
    primary: '#BB86FC',
    primaryVariant: '#3700B3',
    secondary: '#03DAC6',
    background: '#121212',
    surface: 'rgba(255, 255, 255, 0.05)',
    error: '#CF6679',
    textHighEmphasis: 'rgb(255, 255, 255, 0.87)',
    textMediumEmphasis: 'rgb(255, 255, 255, 0.60)',
    textLowEmphasis: 'rgb(255, 255, 255, 0.38)',
    onBackground: '#FFFFFF',
    onSurface: '#FFFFFF',
    onPrimary: '#000000',
    onSecondary: '#000000',
    onError: '#000000',
    ftTheme: 'rgb(0, 186, 187)',
    ftThemeDark: 'rgb(0, 166, 167)',
    dp00: 'rgb(255, 255, 255, 0)',
    dp01: 'rgb(255, 255, 255, 0.05)',
    dp02: 'rgb(255, 255, 255, 0.07)',
    dp03: 'rgb(255, 255, 255, 0.08)',
    dp04: 'rgb(255, 255, 255, 0.09)',
    dp06: 'rgb(255, 255, 255, 0.11)',
    dp08: 'rgb(255, 255, 255, 0.12)',
    dp12: 'rgb(255, 255, 255, 0.14)',
    dp16: 'rgb(255, 255, 255, 0.15)',
    dp24: 'rgb(255, 255, 255, 0.16)',
  } as const,

  fontSize: {
    fs30: '3rem',
    fs24: '2.4rem',
    fs20: '2rem',
    fs18: '1.8rem',
    fs16: '1.6rem',
    fs14: '1.4rem',
    fs12: '1.2rem',
    fs11: '1.1rem',
    fs10: '1rem',
  } as const,

  fontWeight: {
    extraLight: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
    black: 900,
  } as const,

  fontFamily: 'Inconsolata',
} as const;
