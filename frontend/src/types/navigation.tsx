import { Dispatch, SetStateAction } from 'react'

export type SiteMap = {
  label: string
  items: string[]
}

export type NavModalProps = {
  menuIsOpen: boolean
  setMenuIsOpen: Dispatch<SetStateAction<boolean>>
  isSmallScreen: boolean
  setActiveItem: Dispatch<SetStateAction<string>>
}

export type PrimaryNavBarProps = {
  menuIsOpen: boolean
  setMenuIsOpen: Dispatch<SetStateAction<boolean>>
  isSmallScreen: boolean
  setActiveItem: Dispatch<SetStateAction<string>>
}

export type SecondaryNavBarProps = {
  activeItem: string
}

export type NavBarItemsProps = {
  item: string
  isSmallScreen: boolean
  setActiveItem: Dispatch<SetStateAction<string>>
}
