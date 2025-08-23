import { Box, List, ListItem } from '@mui/material'
import { MenuTypography } from '../header/componentsAppNavigation'
import { useContext } from 'react'
import { Context } from '../../context'

export function TopMenu() {
  const arr = Array.from({ length: 50 }, (_, i) => i)
  const { styles } = useContext(Context)

  return (
    <Box
      sx={{
        overflowY: 'auto',
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        background: 'green',
        minHeight: styles.topMenuWidth,
        width: '100%',
        zIndex: 5
      }}
    >
      <List sx={{ position: 'absolute', height: '100%' }}>
        {arr.map((item) => (
          <ListItem key={item}>
            <MenuTypography>{item}</MenuTypography>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
