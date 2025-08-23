import { Box, List, ListItem } from '@mui/material'
import { MenuTypography } from '../header/componentsAppNavigation'
import { useContext } from 'react'
import { Context } from '../../context'

export function SideMenu() {
  const { styles } = useContext(Context)
  const arr = Array.from({ length: 10 }, (_, i) => i)

  return (
    <Box
      sx={{
        minWidth: `${styles.sideMenuWidth}`,
        overflowY: 'auto',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        background: 'red'
      }}
    >
      <List sx={{ position: 'absolute', width: '100%' }}>
        {arr.map((item) => (
          <ListItem key={item}>
            <MenuTypography>{item}</MenuTypography>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
