import { useContext } from 'react'
import { SiteMap } from '../../types/navigation'
import { DesktopAppNavigation } from './DesktopAppNavigation'
import { Context } from '../../context'
import { MobileAppNavigation } from './MobileAppNavigation'

const siteMap: SiteMap[] = [
  { label: 'Tools', items: ['Loots', 'Character', 'Encounter', 'Homebrew', 'Glossary'] },
  { label: 'Player', items: ['Classes', 'Species', 'Backgrounds', 'Feats'] },
  { label: 'Rules', items: ['Monsters', 'Spells', 'Items'] },
  { label: 'Sources', items: ['Adventures', 'Books'] }
]

export function Header() {
  const { isSmallScreen } = useContext(Context)

  return isSmallScreen ? <MobileAppNavigation siteMap={siteMap} /> : <DesktopAppNavigation siteMap={siteMap} />
}
