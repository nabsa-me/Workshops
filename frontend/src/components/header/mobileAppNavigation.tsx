import { Box, Collapse, Fade, List, ListItem, Modal, Paper, useTheme } from '@mui/material'
import { Close, Menu, PlayCircleOutline } from '@mui/icons-material'
import { useContext, useState } from 'react'
import { AppNavigationProps, MobileMenuItemsProps, MobileNavModalProps, SiteMap } from '../../types/navigation'
import { NavContext } from '../../context'
import { AppNavigationBar, MenuTypography } from './componentsAppNavigation'
import { FADE_TIMEOUT, NAVBAR_HEIGHT, QUICK_TRANSITION } from '../../styles/styles-constants'
import { LogoToHome, MenuIconButton, StyledIconButton } from '../common/buttons'
import { useNavigate } from 'react-router'

const MobileMenuItems = ({ item, handleCloseModal }: MobileMenuItemsProps) => {
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
      handleCloseModal(false)
    }
  }

  return (
    <>
      <ListItem key={item} sx={{ paddingRight: '0', justifyContent: 'center' }}>
        <StyledIconButton onClick={() => handleDropDownMenu()}>
          <MenuTypography sx={{ scale: '1.7' }}>
            {item}
            <PlayCircleOutline
              sx={{
                marginLeft: '0.25rem',
                marginBottom: '0.1rem',
                scale: '0.6',
                transform: activeModalItems?.includes(item) ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: QUICK_TRANSITION
              }}
            />
          </MenuTypography>
        </StyledIconButton>
      </ListItem>

      <Collapse in={!!activeModalItems?.includes(item)} timeout={250}>
        <List sx={{ marginBottom: '1rem', marginTop: '-0.5rem', opacity: '0.8' }}>
          {siteMap
            .find((label: SiteMap) => label.label === item)
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

const MobileNavModal = ({ modalIsOpen, handleCloseModal }: MobileNavModalProps) => {
  const { siteMap } = useContext(NavContext)
  const theme = useTheme()

  return (
    <Modal
      open={modalIsOpen}
      onClose={() => handleCloseModal(!modalIsOpen)}
      sx={{
        overflowY: 'scroll',
        top: `${NAVBAR_HEIGHT}`,
        display: 'flex',
        flexDirection: 'column',
        minHeight: `calc(100vh - ${NAVBAR_HEIGHT})`
      }}
      hideBackdrop
      closeAfterTransition
    >
      <Fade in={modalIsOpen} timeout={FADE_TIMEOUT}>
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

export const MobileAppNavigation = ({ siteMap }: AppNavigationProps) => {
  const [activeModalItems, setActiveModalItems] = useState<string[]>([])
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)

  const handleCloseModal: (modalState: boolean) => void = (modalState) => {
    setModalIsOpen(modalState)
    setTimeout(() => {
      setActiveModalItems?.([])
    }, 500)
  }

  return (
    <NavContext.Provider value={{ siteMap, setActiveModalItems, activeModalItems }}>
      <MobileNavModal modalIsOpen={modalIsOpen} handleCloseModal={handleCloseModal} />
      <AppNavigationBar position='sticky'>
        <Box onClick={() => handleCloseModal(false)}>
          <LogoToHome />
        </Box>
        <MenuIconButton
          sx={{ marginRight: '0.5rem' }}
          firstIcon={<Close />}
          secondIcon={<Menu />}
          menuIsOpen={modalIsOpen}
          setMenuIsOpen={setModalIsOpen}
        />
      </AppNavigationBar>
    </NavContext.Provider>
  )
}
