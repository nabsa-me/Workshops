import { Box, Fade, List, ListItem, useTheme } from '@mui/material'
import { MenuTypography } from '../header/componentsAppNavigation'
import { useState } from 'react'
import PushPinIcon from '@mui/icons-material/PushPin'
import AdjustIcon from '@mui/icons-material/Adjust'
import { NAVBAR_HEIGHT_MOBILE, QUICK_TRANSITION, SIDEMENU_WIDTH } from '../../styles/styles-constants'
import { MenuIconButton } from '../common/buttons'
import { InputField } from '../common/inputs'

export function SideMenu() {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(true)
  const theme = useTheme()
  const arr = Array.from({ length: 60 }, (_, i) => i)

  return (
    <Box
      sx={{
        minWidth: menuIsOpen ? SIDEMENU_WIDTH : '50px',
        transform: menuIsOpen ? 'translateX(0px)' : `translateX(-${SIDEMENU_WIDTH})+50px`,
        transition: QUICK_TRANSITION,
        overflowY: 'auto',
        overflowX: 'hidden',
        position: 'relative',
        background: `${theme.palette.base[0]}70`,
        boxShadow: `-15px 0px 25px 15px ${theme.palette.base[300]}, -35px 0px 15px 20px ${theme.palette.negative[300]}`,

        '&::-webkit-scrollbar': {
          width: '4px',
          height: '4px'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: `${theme.palette.negative[400]}`,
          borderRadius: '8px',
          border: `1px solid ${theme.palette.negative[400]}`
        },
        '&::-webkit-scrollbar-track': {
          borderLeft: `1px solid ${theme.palette.base[0]}`,
          backgroundColor: theme.palette.base[500]
        },
        '&::-webkit-scrollbar-button': {
          display: 'none'
        }
      }}
    >
      {/* PIN ICON BAR */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row-reverse',
          height: NAVBAR_HEIGHT_MOBILE,
          position: 'sticky',
          top: 0,
          zIndex: 1,
          background: !menuIsOpen ? `${theme.palette.base[0]}` : 'transparent',
          transition: QUICK_TRANSITION
        }}
      >
        <MenuIconButton
          onClick={() => setMenuIsOpen(!menuIsOpen)}
          sx={{ scale: '1', width: menuIsOpen ? '50px' : '100%', opacity: '0.7' }}
        >
          <Fade in={menuIsOpen} timeout={500}>
            <PushPinIcon sx={{ position: 'absolute' }} />
          </Fade>
          <Fade in={!menuIsOpen} timeout={500}>
            <AdjustIcon />
          </Fade>
        </MenuIconButton>
      </Box>
      {/* MENU CONTENT COMPONENT */}
      <Box sx={{ position: 'absolute', top: NAVBAR_HEIGHT_MOBILE, width: '100%' }}>
        <InputField label='Hello' placeholder='bye' slotProps={{ inputLabel: { shrink: true } }} />
        <List>
          {arr.map((item) => (
            <ListItem key={item}>
              <MenuTypography>{item}</MenuTypography>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  )
}
