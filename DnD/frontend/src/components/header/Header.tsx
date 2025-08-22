import { useContext } from 'react'
import { SiteMap } from '../../types/navigation'
import { DesktopAppNavigation } from './desktopAppNavigation'
import { Context } from '../../context'
import { MobileAppNavigation } from './mobileAppNavigation'
import { Box } from '@mui/material'

const siteMap: SiteMap[] = [
  { label: 'Tools', items: ['Loots', 'Character', 'Encounter', 'Homebrew', 'Glossary'] },
  { label: 'Player', items: ['Classes', 'Species', 'Backgrounds', 'Feats'] },
  { label: 'Rules', items: ['Monsters', 'Spells', 'Items'] },
  { label: 'Sources', items: ['Adventures', 'Books'] }
]

export function Header() {
  const { isSmallScreen } = useContext(Context)

  return (
    <Box sx={{ minHeight: '64px' }}>
      {isSmallScreen ? <MobileAppNavigation siteMap={siteMap} /> : <DesktopAppNavigation siteMap={siteMap} />}
    </Box>
  )
}
