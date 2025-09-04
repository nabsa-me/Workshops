import { Dispatch, SetStateAction } from 'react'
import { SiteMap } from './navigation'

export interface ContextProps {
  isSmallScreen: boolean
}

export interface NavContextProps {
  siteMap: SiteMap[] //general navigation
  setActiveMenuItem?: Dispatch<SetStateAction<string>> // desktop navigation
  activeMenuItem?: string
  setVisibleSubItem?: Dispatch<SetStateAction<boolean>>
  visibleSubItems?: boolean
  setActiveModalItems?: Dispatch<SetStateAction<string[]>> //mobile navigation
  activeModalItems?: string[]
}
