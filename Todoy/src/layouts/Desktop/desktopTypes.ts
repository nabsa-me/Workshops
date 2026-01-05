export type shownOrHiddenType = 'hidden' | ''

export interface IDesktopNavBarProps {
  setSideBarHidden: (hidden: shownOrHiddenType) => void
  sideBarHidden: shownOrHiddenType
}

export interface IDesktopSideBarProps {
  sideBarHidden: shownOrHiddenType
}
