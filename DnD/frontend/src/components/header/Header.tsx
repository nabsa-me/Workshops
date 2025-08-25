import { useContext } from 'react'
import { SiteMap } from '../../types/navigation'
import { Context } from '../../context'
import { MONSTERS } from '../../constants'
import { MobileAppNavigation } from './mobileAppNavigation'
import { DesktopAppNavigation } from './desktopAppNavigation'

const siteMap: SiteMap[] = [
  {
    label: 'Tools',
    items: [
      { label: 'Loots', route: '' },
      { label: 'Character', route: '' },
      { label: 'Encounter', route: '' },
      { label: 'Homebrew', route: '' },
      { label: 'Glossary', route: '' }
    ]
  },
  {
    label: 'Player',
    items: [
      { label: 'Classes', route: '' },
      { label: 'Species', route: '' },
      { label: 'Backgrounds', route: '' },
      { label: 'Feats', route: '' }
    ]
  },
  {
    label: 'Rules',
    items: [
      { label: 'Monsters', route: MONSTERS },
      { label: 'Spells', route: '' },
      { label: 'Items', route: '' }
    ]
  },
  {
    label: 'Sources',
    items: [
      { label: 'Adventures', route: '' },
      { label: 'Books', route: '' }
    ]
  }
]

export function Header() {
  const { isSmallScreen } = useContext(Context)

  return isSmallScreen ? <MobileAppNavigation siteMap={siteMap} /> : <DesktopAppNavigation siteMap={siteMap} />
}
