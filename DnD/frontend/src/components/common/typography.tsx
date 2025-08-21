import { styled, Theme, Typography, TypographyProps } from '@mui/material'
import { metalTransition } from '../../styles/styles-constants'

const titleCommonProps = {
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent'
}

export const HeroTitle = styled((props: TypographyProps) => <Typography {...props} />)(
  ({ theme }: { theme: Theme }) => ({
    fontFamily: "'Cinzel Decorative', serif",
    fontWeight: 700,
    fontSize: '2rem',
    ['@media (min-width: 600px)']: {
      fontSize: '3.1rem'
    },
    padding: '0rem 0.5rem',
    '&:hover': {
      animation: `metal-animation-back ${metalTransition}`
    },
    background: `linear-gradient(
      135deg,
      ${theme.palette.secondary[0]} 0%,
      ${theme.palette.negative[0]} 20%,
      ${theme.palette.negative[200]} 30%,
      ${theme.palette.negative[0]} 45%,
      ${theme.palette.secondary[0]} 65%,
      ${theme.palette.negative[100]} 85%,
      ${theme.palette.negative[300]} 100%)`,
    textShadow: '0px 0px 2px rgba(231, 187, 42, 0.1), 3px 2px 3px rgba(0, 0, 0, 0.6)',
    filter: `contrast(150%) saturate(205%) drop-shadow(3px 3px ${theme.palette.base[100]})`,
    animation: `metal-animation ${metalTransition}`,
    ...titleCommonProps
  })
)

export const HeroSubtitle = styled(HeroTitle)(({ theme }: { theme: Theme }) => ({
  fontSize: '1.3rem',
  ['@media (min-width: 600px)']: {
    fontSize: '2rem'
  },
  background: `linear-gradient(
  135deg,
  ${theme.palette.negative[0]} 0%,
  ${theme.palette.negative[100]} 10%,
  ${theme.palette.negative[0]} 40%,
  ${theme.palette.negative[300]} 100%)`,
  ...titleCommonProps
}))

export const Logo = styled(HeroTitle)(() => ({
  fontSize: '1.5rem !important',
  padding: '0 2rem 0 0',
  '&:hover': {
    cursor: 'pointer'
  },
  '&:active': {
    filter: 'saturate(100%) contrast(150%)',
    animation: `metal-animation ${metalTransition}`
  }
}))

export const GradientTitle = styled(HeroTitle)(({ theme }: { theme: Theme }) => ({
  fontSize: '1.1rem',
  ['@media (min-width: 600px)']: {
    fontSize: '1.3rem'
  },
  textShadow: 'none',
  filter: 'contrast(130%) saturate(150%)',
  background: `linear-gradient(
      135deg,
      ${theme.palette.negative[100]} 0%,
      ${theme.palette.negative[200]} 50%,
      ${theme.palette.secondary[0]} 100%)`,
  ...titleCommonProps
}))

export const TextBody = styled((props: TypographyProps) => <Typography {...props} />)(
  ({ theme }: { theme: Theme }) => ({
    fontFamily: "'Montaga', serif",
    fontWeight: 400,
    fontSize: '1rem',
    padding: '0 0.5rem',
    color: theme.palette.negative[100],
    textShadow: `0 0 1px ${theme.palette.negative[100]}50`
  })
)
