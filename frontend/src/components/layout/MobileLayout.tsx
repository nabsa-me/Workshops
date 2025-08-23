import { Outlet, useLocation } from 'react-router'
import { Box } from '@mui/material'
import { TopMenu } from '../pageMenu/TopMenu'

export function MobileLayout() {
  const location = useLocation()

  const isHomePage = location.pathname === '/'

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1
      }}
    >
      {!isHomePage && <TopMenu />}
      <Box sx={{ width: '100%' }}>
        <Outlet />
      </Box>
    </Box>
  )
}
