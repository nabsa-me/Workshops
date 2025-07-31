import { logoGradient, metalGradient, plainGradient, titleFilter, titleShadow } from '../styles-constants'

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
  animation: 'metal-animation 0.75s ease-in',
  ...titleCommonProps,
  '&:hover': {
    animation: 'metal-animation-back 0.75s ease-in'
  }
}

export const typographyVariants = {
  fontFamily: "'Cinzel Decorative', 'Roboto', sans-serif",
  logo: {
    fontSize: '8rem',
    padding: '0rem 2rem',
    ...logoCommonProps
  },
  hero: {
    fontSize: '2rem',
    ['@media (min-width: 600px)']: {
      fontSize: '3.1rem'
    },
    padding: '0rem 0.5rem',
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
