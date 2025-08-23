import { Button, ButtonProps, styled, Theme } from '@mui/material'
import { metalTransition, colors } from '../../styles/styles-constants'
import { useNavigate } from 'react-router'
import { Logo } from './typography'
import { HOMEPAGE } from '../../constants'

export const CTAButton = styled((props: ButtonProps) => <Button {...props} />)(({ theme }: { theme: Theme }) => ({
  color: colors.grey1,
  fontFamily: "'Cinzel Decorative', serif",
  fontWeight: 700,
  borderColor: theme.palette.negative[300],
  boxShadow: `-5px 5px 45px -5px ${theme.palette.secondary[300]}, 5px -5px 25px -10px ${theme.palette.negative[300]}`,
  textShadow: `2px 2px 2px ${theme.palette.base[0]}`,
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
      ${theme.palette.primary[400]} 0%,
      ${theme.palette.primary[300]} 10%,
      ${theme.palette.secondary[200]} 40%,
      ${theme.palette.primary[400]} 100%)`,
    opacity: 0.35,
    animation: `shine-back ${metalTransition}`
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '0.5rem',
    backgroundColor: theme.palette.base[0],
    zIndex: -1
  },
  '&:hover': {
    boxShadow: `0 0 30px -1px ${theme.palette.secondary[300]}, 0 0 15px -5px ${theme.palette.negative[300]}`,
    borderColor: theme.palette.negative[200],
    color: colors.white,
    '&::after': {
      opacity: 0.5,
      animation: `shine ${metalTransition}`
    }
  },
  '&:active': {
    boxShadow: `-2px 2px 35px -1px ${theme.palette.secondary[300]}, 2px -2px 18px -5px ${theme.palette.negative[200]}`,
    borderColor: theme.palette.negative[100],
    '&::after': {
      opacity: 0.4,
      animation: 'shine-back'
    }
  }
}))

export const LogoToHome = ({ handleCloseModal }: { handleCloseModal?: any }) => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    if (handleCloseModal) {
      handleCloseModal(false)
      navigate(HOMEPAGE)
    } else {
      navigate(HOMEPAGE)
    }
  }

  return <Logo onClick={handleNavigate}>DrAkiA</Logo>
}
