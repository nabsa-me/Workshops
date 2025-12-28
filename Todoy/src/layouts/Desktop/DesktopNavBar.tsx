const DesktopNavBar = ({
  setSideBarHidden,
  sideBarHidden
}: {
  setSideBarHidden: (hidden: 'hidden' | '') => void
  sideBarHidden: 'hidden' | ''
}) => {
  return <div className='desktop-navBar' onClick={() => setSideBarHidden(sideBarHidden ? '' : 'hidden')}></div>
}

export default DesktopNavBar
