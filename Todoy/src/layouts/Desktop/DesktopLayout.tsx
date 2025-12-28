import { useState } from 'react'
import Homepage from '../../pages/Homepage'
import DesktopNavBar from './DesktopNavBar'
import DesktopSideBar from './DesktopSideBar'

const DesktopLayout = () => {
  const [sideBarHidden, setSideBarHidden] = useState<'' | 'hidden'>('')

  return (
    <div className='desktop-appRoot-fullPage'>
      <DesktopNavBar setSideBarHidden={setSideBarHidden} sideBarHidden={sideBarHidden} />
      <div className='desktop-main'>
        <DesktopSideBar sideBarHidden={sideBarHidden} />
        <Homepage />
      </div>
    </div>
  )
}

export default DesktopLayout
