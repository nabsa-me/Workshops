import { createContext } from 'react'
import { ContextProps, NavContextProps } from './types/context'

// GENERAL CONTEXT
export const initialContext = {
  isSmallScreen: false
}

export const Context = createContext<ContextProps>(initialContext)

// NAVIGATION CONTEXT
export const NavContext = createContext<NavContextProps>({
  siteMap: [], //general navigation
  setActiveMenuItem: () => {}, // desktop navigation
  activeMenuItem: '',
  setVisibleSubItem: () => {},
  visibleSubItems: false,
  setActiveModalItems: () => {}, //mobile navigation
  activeModalItems: []
})
