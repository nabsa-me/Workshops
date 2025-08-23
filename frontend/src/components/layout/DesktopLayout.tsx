import { Outlet, useLocation } from 'react-router'
import { Box } from '@mui/material'
import { SideMenu } from '../pageMenu/SideMenu'
import { useContext } from 'react'
import { Context } from '../../context'
import { HOMEPAGE } from '../../constants'

export function DesktopLayout() {
  const location = useLocation()
  const { isSmallScreen } = useContext(Context)
  const { styles } = useContext(Context)

  const isHomePage = location.pathname === HOMEPAGE

  return (
    <Box
      sx={{
        display: 'flex',
        marginTop: isSmallScreen ? '0px' : `${styles.navBarHeight}`,
        minHeight: `calc(100vh - ${styles.navBarHeight} - ${styles.footerHeight})`
      }}
    >
      {!isHomePage && <SideMenu />}
      <Box sx={{ width: '100%' }}>
        <Outlet />
      </Box>
    </Box>
  )
}
