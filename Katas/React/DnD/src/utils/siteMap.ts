export type mainRouteType = 'Tools' | 'Player' | 'Rules' | 'Sources'
export type routeItemType = { label: string; route: string }
export type siteMapType = { [K in mainRouteType]: routeItemType[] }

export const siteMap: siteMapType = {
  ['Tools']: [
    { label: 'Loots', route: '' },
    { label: 'Character', route: '' },
    { label: 'Encounter', route: '' },
    { label: 'Homebrew', route: '' },
    { label: 'Glossary', route: '' }
  ],
  ['Player']: [
    { label: 'Classes', route: '' },
    { label: 'Species', route: '' },
    { label: 'Backgrounds', route: '' },
    { label: 'Feats', route: '' }
  ],
  ['Rules']: [
    { label: 'Monsters', route: '' },
    { label: 'Spells', route: '' },
    { label: 'Items', route: '' }
  ],
  ['Sources']: [
    { label: 'Adventures', route: '' },
    { label: 'Books', route: '' }
  ]
}

export interface MainRoutesListProps {
  handleMouseEnter: (label: mainRouteType) => void
  siteMap: siteMapType
}

export interface SubRoutesListProps {
  mainRoute: routeItemType[]
  auxNavbarVisibility: 'hide' | 'show'
}
