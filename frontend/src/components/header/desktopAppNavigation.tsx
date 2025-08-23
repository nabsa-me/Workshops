import { Box, Fade, List, ListItem, useTheme } from '@mui/material'
import { useContext, useState } from 'react'
import { AppNavigationProps, SiteMap } from '../../types/navigation'
import { Context, NavContext } from '../../context'
import { AppNavigationBar, MenuTypography } from './componentsAppNavigation'
import { useNavigate } from 'react-router'
import { LogoToHome } from '../common/buttons'

function DesktopSubMenuItems({ label, route }: { label: string; route: string }) {
  const { visibleSubItems } = useContext(NavContext)
  const navigate = useNavigate()

  return (
    <Fade in={!!label} timeout={250}>
      <ListItem key={label} sx={{ paddingRight: '0', justifyContent: 'center' }}>
        <MenuTypography
          className={!route ? 'disabled' : ''}
          sx={{ scale: '0.85', opacity: visibleSubItems ? 1 : 0 }}
          onClick={() => !!route && navigate(route)}
        >
          {label}
        </MenuTypography>
      </ListItem>
    </Fade>
  )
}

function DesktopMenuItems({ item }: { item: string }) {
  const { setActiveMenuItem, setVisibleSubItem } = useContext(NavContext)

  return (
    <ListItem key={item} sx={{ paddingRight: '0', justifyContent: 'center' }}>
      <MenuTypography
        onMouseEnter={() => {
          setActiveMenuItem?.(item)
          setVisibleSubItem?.(true)
        }}
      >
        {item}
      </MenuTypography>
    </ListItem>
  )
}

function DesktopSecondaryNavBar() {
  const { siteMap, activeMenuItem, visibleSubItems } = useContext(NavContext)
  const { styles } = useContext(Context)

  const theme = useTheme()

  return (
    <AppNavigationBar
      zIndex={5}
      height='50px !important'
      top={visibleSubItems ? `${styles.navBarHeight}` : '0'}
      opacity={visibleSubItems ? 1 : 0}
      background={`linear-gradient(to right, ${theme.palette.base[100]} -15%,  transparent 150%)`}
      justifyContent='flex-end'
    >
      <List
        sx={{
          display: 'flex',
          padding: '0 !important',
          height: '100%'
        }}
      >
        {siteMap
          ?.find((item: SiteMap) => item.label === activeMenuItem)
          ?.items.map(({ label, route }) => (
            <DesktopSubMenuItems label={label} key={label} route={route} />
          ))}
      </List>
    </AppNavigationBar>
  )
}

function DesktopPrimaryNavBar() {
  const { siteMap } = useContext(NavContext)

  return (
    <AppNavigationBar>
      <LogoToHome />
      <List sx={{ display: 'flex' }}>
        {siteMap?.map(({ label }: SiteMap) => (
          <DesktopMenuItems item={label} key={label} />
        ))}
      </List>
    </AppNavigationBar>
  )
}

export function DesktopAppNavigation({ siteMap }: AppNavigationProps) {
  const [activeMenuItem, setActiveMenuItem] = useState<string>('')
  const [visibleSubItems, setVisibleSubItem] = useState<boolean>(false)

  const handleHideNavBar = () => {
    setVisibleSubItem(false)
    setTimeout(() => {
      setActiveMenuItem('')
    }, 125)
  }

  return (
    <NavContext.Provider value={{ siteMap, setActiveMenuItem, activeMenuItem, setVisibleSubItem, visibleSubItems }}>
      <Box onMouseLeave={() => handleHideNavBar()}>
        <DesktopPrimaryNavBar />
        <DesktopSecondaryNavBar />
      </Box>
    </NavContext.Provider>
  )
}
