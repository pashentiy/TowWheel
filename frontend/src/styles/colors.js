
const LIGHT_THEME = {
    primary: '#DD4D5E',
    primary_dark: '#D03E4F',
    primary_light: '#EA5A6B',
    secondary: '#FF7171',
    secondary_very_light: '#FFCACA',
    secondary20: 'rgba(255,113,113,0.2)',
    grey: '#D7DDE2',
    black: '#141414',
    white: '#FFF',
    status_bar: '#1A1A1A',
    background: '#F2F3F8',
    text: '#000000',
    muted_text: '#B3B3B4'
}

const DARK_THEME = {
    ...LIGHT_THEME,
}

export const Themes = {
    primary : LIGHT_THEME,
    dark : DARK_THEME
}

export default LIGHT_THEME

