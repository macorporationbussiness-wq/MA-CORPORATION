// M.A. Corporation Design System — Navy / White / Teal Corporate Theme
export const COLORS = {
    navy: '#0A1733',
    navy2: '#0D1F47',
    navy3: '#102A5C',
    teal: '#14B8A6',
    teal2: '#0EA5A4',
    tealBright: '#2DD4BF',
    white: '#FFFFFF',
    gray50: '#F6F8FB',
    gray100: '#EEF2F7',
    gray200: '#E2E8F0',
    ink: '#0A1733',
    inkSoft: '#475569',
    onDark: '#FFFFFF',
    onDarkSoft: '#B6C2D9',
    borderLight: 'rgba(10, 23, 51, 0.10)',
    borderDark: 'rgba(255, 255, 255, 0.08)',
};

const theme = {
    colors: COLORS,
    fontFamily: "'Inter', 'Plus Jakarta Sans', system-ui, sans-serif",
    headingFont: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
    radius: 14,
    radiusSm: 10,
    maxWidth: 1200,
    breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
    },
};

export default theme;
