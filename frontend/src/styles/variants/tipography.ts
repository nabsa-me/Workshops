import {
  logoGradient,
  metalGradient,
  metalTransition,
  plainGradient,
  titleFilter,
  titleShadow
} from '../styles-constants'

const titleCommonProps = {
  fontFamily: "'Cinzel Decorative', serif",
  fontWeight: 700,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent'
}
const logoCommonProps = {
  background: logoGradient,
  textShadow: titleShadow,
  filter: titleFilter,
  animation: `metal-animation ${metalTransition}`,
  ...titleCommonProps
}

export const typographyVariants = {
  fontFamily: "'Cinzel Decorative', 'Roboto', sans-serif",
  logo: {
    fontSize: '1.5rem',
    padding: '0 2rem 0 0',
    '&:hover': {
      cursor: 'pointer',
      animation: `metal-animation-back ${metalTransition}`
    },
    '&:active': {
      filter: 'saturate(100%) contrast(150%)',
      animation: `metal-animation ${metalTransition}`
    },
    ...logoCommonProps
  },
  hero: {
    fontSize: '2rem',
    ['@media (min-width: 600px)']: {
      fontSize: '3.1rem'
    },
    padding: '0rem 0.5rem',
    '&:hover': {
      animation: `metal-animation-back ${metalTransition}`
    },
    ...logoCommonProps
  },
  h1: {
    fontSize: '1.3rem',
    ['@media (min-width: 600px)']: {
      fontSize: '2rem'
    },
    padding: '0rem 0.5rem',
    background: metalGradient,
    textShadow: titleShadow,
    filter: titleFilter,
    ...titleCommonProps
  },
  h2: {
    fontSize: '1.1rem',
    ['@media (min-width: 600px)']: {
      fontSize: '1.3rem'
    },
    padding: '0rem 0.5rem',
    background: plainGradient,
    textShadow: 'none',
    filter: 'contrast(130%) saturate(150%)',
    ...titleCommonProps
  },
  body1: {
    fontFamily: "'Montaga', serif",
    fontWeight: 400,
    fontSize: '1rem',
    padding: '0 0.5rem'
  }
}
