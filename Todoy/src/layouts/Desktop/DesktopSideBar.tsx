const DesktopSideBar = ({ sideBarHidden }: { sideBarHidden: boolean }) => {
  return <div className={`desktop-sideBar ${sideBarHidden ? '' : 'hidden'}`}></div>
}

export default DesktopSideBar
