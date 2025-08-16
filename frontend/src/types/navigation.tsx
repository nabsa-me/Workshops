import { CSSProperties } from '@mui/material'

export type SiteMap = {
  label: string
  items: string[]
}

export type AppNavigationProps = {
  siteMap: SiteMap[]
}

export interface NavigationBarProps {
  children: React.ReactNode
  height?: string
  position?: 'absolute' | 'sticky'
  justifyContent?: 'flex-end' | 'space-between' | 'flex-start'
  top?: string | number
  opacity?: number
  zIndex?: number
  background?: CSSProperties['background'] | string
  elevation?: number
}
