import { Box, Fade, List, ListItem, useTheme } from '@mui/material'
import { useContext, useState } from 'react'
import { AppNavigationProps, SiteMap } from '../../types/navigation'
import { NavContext } from '../../context'
import { AppNavigationBar, MenuTypography } from './componentsAppNavigation'
import { Logo } from '../common/typography'

function DesktopSubMenuItems({ item }: { item: string }) {
  const { visibleSubItems } = useContext(NavContext)

  return (
    <Fade in={!!item} timeout={250}>
      <ListItem key={item} sx={{ paddingRight: '0', justifyContent: 'center' }}>
        <MenuTypography sx={{ scale: '0.85', opacity: visibleSubItems ? 1 : 0 }}>{item}</MenuTypography>
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
  const theme = useTheme()

  return (
    <AppNavigationBar
      zIndex={5}
      height='50px !important'
      top={visibleSubItems ? '64px' : '0'}
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
          ?.items.map((item: string) => (
            <DesktopSubMenuItems item={item} key={item} />
          ))}
      </List>
    </AppNavigationBar>
  )
}

function DesktopPrimaryNavBar() {
  const { siteMap } = useContext(NavContext)

  return (
    <AppNavigationBar>
      <Logo>DrAkiA</Logo>
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
