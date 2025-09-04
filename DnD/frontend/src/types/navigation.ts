import { CSSProperties } from '@mui/material'

export interface SiteMap {
  label: string
  items: { label: string; route: string }[]
}

export interface AppNavigationProps {
  siteMap: SiteMap[]
}

export interface NavigationBarProps {
  children: React.ReactNode
  height?: string
  position?: 'sticky' | 'fixed'
  justifyContent?: 'flex-end' | 'flex-start'
  top?: string | number
  opacity?: number
  zIndex?: number
  background?: CSSProperties['background'] | string
  elevation?: number
}

export interface MobileNavModalProps {
  modalIsOpen: boolean
  handleCloseModal: (modalState: boolean) => void
}

export interface MobileMenuItemsProps {
  item: string
  handleCloseModal: (modalState: boolean) => void
}
