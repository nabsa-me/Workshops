import { createContext, Dispatch, SetStateAction } from 'react'
import { SiteMap } from './types/navigation'

// GENERAL CONTEXT

interface ContextProps {
  isSmallScreen: boolean
}

export const initialContext = {
  isSmallScreen: false
}

export const Context = createContext<ContextProps>(initialContext)

// NAVIGATION CONTEXT

interface NavContextProps {
  //general navigation
  siteMap: SiteMap[]
  // desktop navigation
  setActiveMenuItem?: Dispatch<SetStateAction<string>>
  activeMenuItem?: string
  setVisibleSubItem?: Dispatch<SetStateAction<boolean>>
  visibleSubItems?: boolean
  //mobile navigation
  setActiveModalItems?: Dispatch<SetStateAction<string[]>>
  activeModalItems?: string[]
}

export const NavContext = createContext<NavContextProps>({
  //general navigation
  siteMap: [],
  setActiveMenuItem: () => {},
  activeMenuItem: '',
  setVisibleSubItem: () => {},
  visibleSubItems: false,
  //mobile navigation
  setActiveModalItems: () => {},
  activeModalItems: []
})
