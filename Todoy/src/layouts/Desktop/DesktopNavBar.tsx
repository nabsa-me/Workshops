const DesktopNavBar = ({
  setSideBarHidden,
  sideBarHidden
}: {
  setSideBarHidden: (hidden: boolean) => void
  sideBarHidden: boolean
}) => {
  return <div className='desktop-navBar' onClick={() => setSideBarHidden(!sideBarHidden)}></div>
}

export default DesktopNavBar
