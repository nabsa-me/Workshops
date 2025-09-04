import {
  Box,
  Button,
  ButtonProps,
  Fade,
  IconButton,
  IconButtonProps,
  styled,
  Theme,
  Switch,
  FormGroup,
  FormControlLabel,
  FormControl
} from '@mui/material'
import {
  FADE_TIMEOUT,
  METAL_TRANSITION,
  QUICK_TRANSITION,
  SOFT_TRANSITION,
  colors
} from '../../styles/styles-constants'
import { useNavigate } from 'react-router'
import { Logo } from './typography'
import { HOMEPAGE } from '../../constants'
import { MenuIconButtonProps } from '../../types/buttons'
import { getInputProps } from './helper'

export const CTAButton = styled((props: ButtonProps) => <Button {...props} />)(({ theme }: { theme: Theme }) => ({
  color: colors['grey1'],
  fontFamily: "'Cinzel Decorative', serif",
  fontWeight: 700,
  borderColor: theme.palette.negative[300],
  boxShadow: `-5px 5px 45px -5px ${theme.palette.secondary[300]}, 5px -5px 25px -10px ${theme.palette.negative[300]}`,
  textShadow: `2px 2px 2px ${theme.palette.base[0]}`,
  position: 'relative',
  height: '2.8rem',
  width: '8.5rem',
  zIndex: 1,
  transition: METAL_TRANSITION,
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
    animation: `shine-back ${METAL_TRANSITION}`
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
    color: colors['white'],
    '&::after': {
      opacity: 0.5,
      animation: `shine ${METAL_TRANSITION}`
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

export const StyledIconButton = styled((props: IconButtonProps) => <IconButton {...props} />)(({ theme }) => ({
  color: theme.palette.negative[200],
  borderRadius: '0',
  transition: SOFT_TRANSITION,
  scale: '1.3',
  '&:hover': {
    filter: 'drop-shadow(0px 0px 2px rgba(255, 255, 255, 0.6))'
  },
  '&:active': {
    transition: QUICK_TRANSITION,
    filter: 'drop-shadow(0px 0px 10px rgb(0, 0, 0, 0.4))',
    color: theme.palette.negative[300]
  }
}))

export const MenuIconButton = ({ menuIsOpen, setMenuIsOpen, firstIcon, secondIcon, sx }: MenuIconButtonProps) => {
  return (
    <StyledIconButton onClick={() => setMenuIsOpen(!menuIsOpen)} sx={{ ...sx }}>
      <Fade in={menuIsOpen} timeout={FADE_TIMEOUT}>
        <Box sx={{ position: 'absolute' }}>{firstIcon}</Box>
      </Fade>
      <Fade in={!menuIsOpen} timeout={FADE_TIMEOUT}>
        <Box>{secondIcon}</Box>
      </Fade>
    </StyledIconButton>
  )
}

export const LogoToHome = () => {
  const navigate = useNavigate()

  return <Logo onClick={() => navigate(HOMEPAGE)}>DrAkiA</Logo>
}

const SwitchLabel = styled(FormControlLabel)(({ theme }: { theme: Theme }) => {
  const props = getInputProps(theme)

  return {
    color: props.INPUT_TEXT_COLOR,
    '& .MuiFormControlLabel-label': {
      fontSize: '0.8rem',
      fontFamily: props.FONT_FAMILY
    }
  }
})

export const SwitchButton = ({ label }: { label: string }) => {
  return (
    <FormControl>
      <FormGroup row>
        <SwitchLabel value='top' control={<Switch color='secondary' />} label={label} labelPlacement='top' />
      </FormGroup>
    </FormControl>
  )
}
