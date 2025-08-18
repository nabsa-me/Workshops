import { CSSObject } from '@emotion/react'
import { colors, metalTransition } from '../styles-constants'

export const CTAButtonProps: CSSObject = {
  color: colors.grey1,
  fontWeight: 700,
  borderColor: colors.grey3,
  boxShadow: `0 0 35px ${colors.gr3}, 0 0 8px ${colors.grey3}`,
  textShadow: '2px 2px 2px rgba(0, 0, 0, 1)',
  position: 'relative',
  height: '2.8rem',
  width: '8.5rem',
  zIndex: 1,
  transition: metalTransition,
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '0.5rem',
    background: `linear-gradient(
    135deg,
    ${colors.gold4} 0%,
    ${colors.gold3} 10%,
    ${colors.gr2} 40%,
    ${colors.gold4} 100%)`,
    opacity: 0.35,
    animation: `shine-back ${metalTransition}`
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '0.5rem',
    backgroundColor: colors.black,
    zIndex: -1
  },
  '&:hover': {
    boxShadow: `0 0 30px ${colors.gr3}, 0 0 15px ${colors.grey2}`,
    borderColor: colors.grey2,
    color: colors.white,
    '&::after': {
      opacity: 0.5,
      animation: `shine ${metalTransition}`
    }
  },
  '&:active': {
    boxShadow: `0 0 35px ${colors.gr3}, 0 0 18px ${colors.grey2}`,
    borderColor: colors.grey1,
    '&::after': {
      opacity: 0.4,
      animation: 'shine-back'
    }
  }
}
