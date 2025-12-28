import { useState } from 'react'
import SideBarNavigationCard from '../../shared/components/navigationCards/SideBarNavigationCard'

const DesktopSideBar = ({ sideBarHidden }: { sideBarHidden: 'hidden' | '' }) => {
  const [scrollbarHidden, setScrollbarHidden] = useState<'hidden' | ''>('hidden')

  return (
    <div
      className={`desktop-sideBar ${sideBarHidden}`}
      onMouseEnter={() => setScrollbarHidden('')}
      onMouseLeave={() => setScrollbarHidden('hidden')}
    >
      <div className={`desktop-sideBar-body ${sideBarHidden}`}>
        <div className={`desktop-sideBar-body-scrollable ${scrollbarHidden}`}>
          <div className='desktop-sideBar-body-content'>
            <nav className='desktop-sideBar-body-topLinks'>
              <SideBarNavigationCard label='Home' icon='home' />
              <SideBarNavigationCard label='My tasks' icon='check_circle' />
            </nav>
          </div>
        </div>
      </div>
      <div className='desktop-sideBar-footer'></div>
    </div>
  )
}

export default DesktopSideBar
