import { Box, List, ListItem } from '@mui/material'
import { MenuTypography } from '../header/componentsAppNavigation'
import { TOPMENU_WIDTH } from '../../styles/styles-constants'

export const TopMenu = () => {
  const arr = Array.from({ length: 50 }, (_, i) => i)

  return (
    <Box
      sx={{
        overflowY: 'auto',
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        background: 'green',
        minHeight: TOPMENU_WIDTH,
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
