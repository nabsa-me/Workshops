import { IDesktopNavBarProps } from './desktopTypes'

const DesktopNavBar = ({ setSideBarHidden, sideBarHidden }: IDesktopNavBarProps) => {
  return <div className='desktop-navBar' onClick={() => setSideBarHidden(sideBarHidden ? '' : 'hidden')}></div>
}

export default DesktopNavBar
