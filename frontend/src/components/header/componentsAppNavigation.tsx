import { AppBar, IconButton, IconButtonProps, styled, Toolbar, TypographyProps, useTheme } from '@mui/material'
import { quickTransition, softTransition } from '../../styles/styles-constants'
import { NavigationBarProps } from '../../types/navigation'
import { GradientTitle } from '../common/typography'

export const MenuDropDownIconButton = styled((props: IconButtonProps) => <IconButton {...props} />)(({ theme }) => ({
  color: theme.palette.negative[200],
  transition: softTransition,
  '&:hover': {
    filter: 'drop-shadow(0px 0px 2px rgba(255, 255, 255, 0.6))'
  },
  '&:active': {
    transition: quickTransition,
    filter: 'drop-shadow(0px 0px 10px rgb(0, 0, 0, 0.4))',
    color: theme.palette.negative[300]
  }
}))

export const MenuTypography = styled((props: TypographyProps) => <GradientTitle {...props} />)(() => ({
  fontSize: '0.95rem !important',
  transition: softTransition,
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    textShadow: '0px 0px 2px rgba(255, 255, 255, 0.6)',
    cursor: 'pointer'
  },
  '&:active': {
    transition: quickTransition,
    textShadow: '0px 0px 10px rgb(0, 0, 0, 0.4)'
  }
}))

export function AppNavigationBar({
  children,
  height = '64px !important',
  position = 'fixed',
  top = 0,
  opacity = 1,
  zIndex = 10,
  justifyContent = 'space-between',
  background
}: NavigationBarProps) {
  const theme = useTheme()
  const themedBackground =
    background ||
    `linear-gradient(to right, ${theme.palette.base[0]} -50%, ${theme.palette.base[100]} 50%, transparent 150%)`

  return (
    <AppBar
      position={position}
      sx={{
        backdropFilter: 'blur(15px)',
        background: themedBackground,
        borderBottom: `1px solid ${theme.palette.base[300]}`,
        zIndex,
        height,
        top,
        opacity,
        transition: quickTransition,
        boxShadow: `0px -3px 15px 5px ${theme.palette.base[100]}, 0px -2px 25px -15px ${theme.palette.negative[300]}`
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent,
          width: '100%',
          minHeight: height
        }}
      >
        {children}
      </Toolbar>
    </AppBar>
  )
}
