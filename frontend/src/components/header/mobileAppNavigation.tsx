import { Collapse, Fade, List, ListItem, Modal, Paper, Typography } from '@mui/material'
import { Close, Menu, PlayCircleOutline } from '@mui/icons-material'
import { useContext, useState } from 'react'
import { AppNavigationProps, SiteMap } from '../../types/navigation'
import { NavContext } from '../../context'
import { MenuDropDownIconButton, AppNavigationBar, MenuTypography } from './componentsAppNavigation'
import { quickTransition } from '../../styles/styles-constants'

const MobileMenuItems = ({ item }: { item: string }) => {
  const { siteMap, activeModalItems, setActiveModalItems } = useContext(NavContext)

  const handleDropDownMenu = () => {
    if (activeModalItems?.includes(item)) {
      setActiveModalItems?.(activeModalItems?.filter((label: string) => label !== item))
    } else {
      setActiveModalItems?.([...activeModalItems!, item])
    }
  }

  return (
    <>
      <ListItem key={item} sx={{ paddingRight: '0', justifyContent: 'center' }}>
        <MenuDropDownIconButton onClick={() => handleDropDownMenu()}>
          <MenuTypography sx={{ scale: '1.7' }}>
            {item}
            {
              <PlayCircleOutline
                sx={{
                  marginLeft: '0.25rem',
                  marginBottom: '0.1rem',
                  scale: '0.6',
                  transform: activeModalItems?.includes(item) ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: quickTransition
                }}
              />
            }
          </MenuTypography>
        </MenuDropDownIconButton>
      </ListItem>

      <Collapse in={activeModalItems?.includes(item)} timeout={250}>
        <List sx={{ marginBottom: '1rem', marginTop: '-0.5rem', opacity: '0.8' }}>
          {siteMap
            ?.find((label: SiteMap) => label.label === item)
            ?.items.map((item: string) => (
              <ListItem key={item} sx={{ justifyContent: 'center' }}>
                <MenuTypography>{item}</MenuTypography>
              </ListItem>
            ))}
        </List>
      </Collapse>
    </>
  )
}

function MobileNavModal({ modaIsOpen, handleCloseModal }: { modaIsOpen: boolean; handleCloseModal: () => void }) {
  const { siteMap } = useContext(NavContext)

  return (
    <Modal
      open={modaIsOpen}
      onClose={() => handleCloseModal()}
      sx={{
        overflowY: 'scroll',
        top: '64px',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 'calc(100vh - 64px)'
      }}
      hideBackdrop
      closeAfterTransition
    >
      <Fade in={modaIsOpen} timeout={500}>
        <Paper
          sx={{
            display: 'flex',
            flex: 1,
            overflowY: 'visible',
            backdropFilter: 'blur(25px) brightness(0.75)',
            maskImage: 'linear-gradient(to top, rgb(0,0,0,1) calc(100% - 125px), rgb(0,0,0,0.6) 100%)',
            background: 'transparent'
          }}
        >
          <List sx={{ width: '100%', marginTop: '30%', marginBottom: '20%' }}>
            {siteMap.map(({ label }: SiteMap) => (
              <MobileMenuItems item={label} key={label} />
            ))}
          </List>
        </Paper>
      </Fade>
    </Modal>
  )
}

export function MobileAppNavigation({ siteMap }: AppNavigationProps) {
  const [activeModalItems, setActiveModalItems] = useState<string[]>([])
  const [modaIsOpen, setModalIsOpen] = useState<boolean>(false)

  const handleCloseModal = () => {
    setModalIsOpen(!modaIsOpen)
    setTimeout(() => {
      setActiveModalItems?.([])
    }, 500)
  }

  return (
    <NavContext.Provider value={{ siteMap, setActiveModalItems, activeModalItems }}>
      <MobileNavModal modaIsOpen={modaIsOpen} handleCloseModal={handleCloseModal} />
      <AppNavigationBar>
        <Typography variant='logo'>DrAkiA</Typography>
        <MenuDropDownIconButton
          onClick={() => handleCloseModal()}
          sx={{
            scale: '1.3',
            marginRight: '0.5rem'
          }}
        >
          <Fade in={!modaIsOpen} timeout={500}>
            <Menu sx={{ position: 'absolute' }} />
          </Fade>
          <Fade in={modaIsOpen} timeout={500}>
            <Close sx={{ position: 'absolute' }} />
          </Fade>
        </MenuDropDownIconButton>
      </AppNavigationBar>
    </NavContext.Provider>
  )
}
