import { Outlet, useLocation } from 'react-router'
import { Box } from '@mui/material'
import { CustomMenu } from './CustomMenu'

export function LayoutWithMenu() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <Box sx={{ display: 'flex' }}>
      {!isHomePage && <CustomMenu />}
      <Box sx={{ width: 'calc(100% - 300px)', ml: 'auto' }}>
        <Outlet />
      </Box>
    </Box>
  )
}
