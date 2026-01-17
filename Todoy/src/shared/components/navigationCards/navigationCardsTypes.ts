import { Dispatch, SetStateAction } from 'react'

export interface ITabsNavigation {
  setActiveTab: Dispatch<SetStateAction<string>>
  activeTab: string
  tabsList: string[]
}

export interface ITabsCard {
  setActiveTab: Dispatch<SetStateAction<string>>
  activeTab: string
  title: string
}
