import { Box, useTheme } from '@mui/material'
import { useState } from 'react'
import PushPinIcon from '@mui/icons-material/PushPin'
import AdjustIcon from '@mui/icons-material/Adjust'
import { NAVBAR_HEIGHT_MOBILE, QUICK_TRANSITION, SIDEMENU_WIDTH } from '../../styles/styles-constants'
import { MenuIconButton } from '../common/buttons'
import { TextBody } from '../common/typography'
import { MonstersMenu } from './MonstersMenu'

export const SideMenu = () => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(true)
  const theme = useTheme()

  return (
    <Box
      sx={{
        minWidth: menuIsOpen ? SIDEMENU_WIDTH : '50px',
        transform: menuIsOpen ? 'translateX(0px)' : 'translateX(-100%)+50px',
        transition: QUICK_TRANSITION,
        overflowY: 'auto',
        overflowX: 'hidden',
        position: 'relative',
        background: `${theme.palette.base[0]}85`,
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
      <Box
        sx={{
          display: 'flex',
          height: NAVBAR_HEIGHT_MOBILE,
          position: 'sticky',
          top: 0,
          zIndex: 10,
          transition: QUICK_TRANSITION,
          alignItems: 'center',
          justifyContent: 'space-between',
          background: theme.palette.base[0],
          boxShadow: ` 0 -3px 5px white, 0 0 10px ${theme.palette.base[0]}`
        }}
      >
        <TextBody
          className='disabled'
          sx={{
            position: 'absolute',
            left: '1.5rem',
            opacity: menuIsOpen ? 1 : 0,
            transition: QUICK_TRANSITION,
            minWidth: '110px'
          }}
        >
          3707 results
        </TextBody>
        <MenuIconButton
          sx={{
            scale: '1',
            width: menuIsOpen ? '50px' : '100%',
            opacity: '0.7',
            marginLeft: 'auto',
            marginTop: '0.5rem'
          }}
          firstIcon={<PushPinIcon />}
          secondIcon={<AdjustIcon />}
          menuIsOpen={menuIsOpen}
          setMenuIsOpen={setMenuIsOpen}
        />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          width: SIDEMENU_WIDTH,
          top: NAVBAR_HEIGHT_MOBILE,
          right: menuIsOpen ? '0px' : '50px',
          transition: QUICK_TRANSITION
        }}
      >
        <MonstersMenu />
      </Box>
    </Box>
  )
}
