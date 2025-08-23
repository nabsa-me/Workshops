import { Collapse, Fade, List, ListItem, Modal, Paper, useTheme } from '@mui/material'
import { Close, Menu, PlayCircleOutline } from '@mui/icons-material'
import { useContext, useState } from 'react'
import { AppNavigationProps, SiteMap } from '../../types/navigation'
import { Context, NavContext } from '../../context'
import { MenuDropDownIconButton, AppNavigationBar, MenuTypography } from './componentsAppNavigation'
import { quickTransition } from '../../styles/styles-constants'
import { LogoToHome } from '../common/buttons'
import { useNavigate } from 'react-router'

const MobileMenuItems = ({ item, handleCloseModal }: { item: string; handleCloseModal: () => void }) => {
  const { siteMap, activeModalItems, setActiveModalItems } = useContext(NavContext)
  const navigate = useNavigate()

  const handleDropDownMenu = () => {
    if (activeModalItems?.includes(item)) {
      setActiveModalItems?.(activeModalItems?.filter((label: string) => label !== item))
    } else {
      setActiveModalItems?.([...activeModalItems!, item])
    }
  }

  const handleNavigate = (route: string) => {
    if (route) {
      navigate(route)
      handleCloseModal()
    }
  }

  return (
    <>
      <ListItem key={item} sx={{ paddingRight: '0', justifyContent: 'center' }}>
        <MenuDropDownIconButton onClick={() => handleDropDownMenu()}>
          <MenuTypography sx={{ scale: '1.7' }}>
            {item}
            <PlayCircleOutline
              sx={{
                marginLeft: '0.25rem',
                marginBottom: '0.1rem',
                scale: '0.6',
                transform: activeModalItems?.includes(item) ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: quickTransition
              }}
            />
          </MenuTypography>
        </MenuDropDownIconButton>
      </ListItem>

      <Collapse in={activeModalItems?.includes(item)} timeout={250}>
        <List sx={{ marginBottom: '1rem', marginTop: '-0.5rem', opacity: '0.8' }}>
          {siteMap
            ?.find((label: SiteMap) => label.label === item)
            ?.items.map(({ label, route }) => (
              <ListItem key={label} sx={{ justifyContent: 'center' }}>
                <MenuTypography className={!route ? 'disabled' : ''} onClick={() => handleNavigate(route)}>
                  {label}
                </MenuTypography>
              </ListItem>
            ))}
        </List>
      </Collapse>
    </>
  )
}

function MobileNavModal({ modaIsOpen, handleCloseModal }: { modaIsOpen: boolean; handleCloseModal: any }) {
  const { siteMap } = useContext(NavContext)
  const { styles } = useContext(Context)

  const theme = useTheme()

  return (
    <Modal
      open={modaIsOpen}
      onClose={() => handleCloseModal(!modaIsOpen)}
      sx={{
        overflowY: 'scroll',
        top: `${styles.navBarHeight}`,
        display: 'flex',
        flexDirection: 'column',
        minHeight: `calc(100vh - ${styles.navBarHeight})`
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
            maskImage: 'linear-gradient(to top, rgb(0,0,0,1) calc(100% - 90px), rgb(0,0,0,0.6) 100%)',
            background: `${theme.palette.base[100]}50`
          }}
        >
          <List sx={{ width: '100%', marginTop: '30%', marginBottom: '20%' }}>
            {siteMap.map(({ label }: SiteMap) => (
              <MobileMenuItems item={label} key={label} handleCloseModal={handleCloseModal} />
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

  const handleCloseModal = (modalState: boolean) => {
    setModalIsOpen(modalState)
    setTimeout(() => {
      setActiveModalItems?.([])
    }, 500)
  }

  return (
    <NavContext.Provider value={{ siteMap, setActiveModalItems, activeModalItems }}>
      <MobileNavModal modaIsOpen={modaIsOpen} handleCloseModal={handleCloseModal} />
      <AppNavigationBar position='sticky'>
        <LogoToHome handleCloseModal={handleCloseModal} />
        <MenuDropDownIconButton
          onClick={() => handleCloseModal(!modaIsOpen)}
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
