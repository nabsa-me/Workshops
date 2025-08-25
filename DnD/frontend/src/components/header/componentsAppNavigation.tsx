import { AppBar, styled, Toolbar, TypographyProps, useTheme } from '@mui/material'
import { NavigationBarProps } from '../../types/navigation'
import { GradientTitle } from '../common/typography'
import { NAVBAR_HEIGHT, QUICK_TRANSITION, SOFT_TRANSITION } from '../../styles/styles-constants'

export const MenuTypography = styled((props: TypographyProps) => <GradientTitle {...props} />)(() => ({
  fontSize: '0.95rem !important',
  transition: SOFT_TRANSITION,
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    textShadow: '0px 0px 2px rgba(255, 255, 255, 0.6)',
    cursor: 'pointer'
  },
  '&:active': {
    transition: QUICK_TRANSITION,
    textShadow: '0px 0px 10px rgb(0, 0, 0, 0.4)'
  }
}))

export function AppNavigationBar({
  children,
  height = NAVBAR_HEIGHT,
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
        borderBottom: `1px solid ${theme.palette.base[300]}80`,
        zIndex,
        height: `${height}`,
        top,
        opacity,
        transition: QUICK_TRANSITION,
        boxShadow: `0px -3px 15px 5px ${theme.palette.base[100]}, 0px -2px 25px -15px ${theme.palette.negative[400]}`
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
