import { Outlet, useLocation } from 'react-router'
import { Box } from '@mui/material'
import { SideMenu } from '../pageMenu/SideMenu'
import { useContext } from 'react'
import { Context } from '../../context'
import { HOMEPAGE } from '../../constants'
import { FOOTER_HEIGHT, NAVBAR_HEIGHT } from '../../styles/styles-constants'

export function DesktopLayout() {
  const location = useLocation()
  const { isSmallScreen } = useContext(Context)

  const isHomePage = location.pathname === HOMEPAGE

  return (
    <Box
      sx={{
        display: 'flex',
        marginTop: isSmallScreen ? '0px' : `${NAVBAR_HEIGHT}`,
        minHeight: `calc(100vh - ${NAVBAR_HEIGHT} - ${FOOTER_HEIGHT})`
      }}
    >
      {!isHomePage && <SideMenu />}
      <Box sx={{ width: '100%' }}>
        <Outlet />
      </Box>
    </Box>
  )
}
