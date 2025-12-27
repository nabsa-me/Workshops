import { useState } from 'react'
import DesktopNavBar from './DesktopNavBar'
import DesktopSideBar from './DesktopSideBar'
import Homepage from '../../pages/Homepage'

const DesktopLayout = () => {
  const [sideBarHidden, setSideBarHidden] = useState<boolean>(true)

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
