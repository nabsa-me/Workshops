import { Box, List, ListItem } from '@mui/material'
import { MenuTypography } from '../header/componentsAppNavigation'

export function CustomMenu() {
  const arr = Array.from({ length: 50 }, (_, i) => i)

  return (
    <Box
      component={'section'}
      sx={{
        width: 300,
        border: '2px solid red',
        position: 'sticky',
        float: 'none'
      }}
    >
      <List sx={{ overflowY: 'auto', overflowX: 'hidden', maxHeight: 'calc(90vh)' }}>
        {arr.map((monster) => (
          <ListItem key={monster}>
            <MenuTypography>{monster}</MenuTypography>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
