import { Box, Fade, List, ListItem, Typography } from '@mui/material'
import { colors } from '../../styles/styles-constants'
import { useContext, useState } from 'react'
import { AppNavigationProps, SiteMap } from '../../types/navigation'
import { NavContext } from '../../context'
import { AppNavigationBar, MenuTypography } from './componentsAppNavigation'

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

  return (
    <AppNavigationBar
      position='absolute'
      elevation={2}
      zIndex={5}
      height='50px !important'
      top={visibleSubItems ? '64px' : '0'}
      opacity={visibleSubItems ? 1 : 0}
      background={`linear-gradient(to right, ${colors.black3}50 0%, ${colors.grey4}30 80%)`}
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
      <Typography variant='logo'>DrAkiA</Typography>
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
