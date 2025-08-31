import { CSSProperties } from '@mui/material'

export type SiteMap = {
  label: string
  items: { label: string; route: string }[]
}

export type AppNavigationProps = {
  siteMap: SiteMap[]
}

export type NavigationBarProps = {
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

export type MobileNavModalProps = {
  modalIsOpen: boolean
  handleCloseModal: (modalState: boolean) => void
}

export type MobileMenuItemsProps = {
  item: string
  handleCloseModal: (modalState: boolean) => void
}
