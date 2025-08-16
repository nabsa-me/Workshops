import { AppBar, IconButton, IconButtonProps, styled, Toolbar, Typography, TypographyProps } from '@mui/material'
import { colors, quickTransition, softTransition } from '../styles/styles-constants'
import { NavigationBarProps } from '../types/navigation'

export const MenuDropDownIconButton = styled((props: IconButtonProps) => <IconButton {...props} />)(() => ({
  color: colors.grey2,
  transition: softTransition,
  '&:hover': {
    filter: 'drop-shadow(0px 0px 2px rgba(255, 255, 255, 0.6))'
  },
  '&:active': {
    transition: quickTransition,
    filter: 'drop-shadow(0px 0px 10px rgb(0, 0, 0, 0.4))',
    color: colors.grey3
  }
}))

export const MenuTypography = styled((props: TypographyProps) => <Typography {...props} variant='h2' />)(() => ({
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
  position = 'sticky',
  top = 0,
  opacity = 1,
  zIndex = 10,
  elevation = 5,
  justifyContent = 'space-between',
  background = `linear-gradient(to right, ${colors.black1} 5%, ${colors.black2} 20%, transparent 125%)`
}: NavigationBarProps) {
  return (
    <AppBar
      position={position}
      elevation={elevation}
      sx={{
        backdropFilter: 'blur(10px)',
        background,
        borderBottom: `1px solid${colors.black4}`,
        zIndex,
        height,
        top,
        opacity,
        transition: quickTransition
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
