const SideBarNavigationCard = ({ label, icon }: { label: string; icon: string }) => {
  return (
    <div className='sideBar-navigationCard'>
      <span className='material-symbols-rounded'>{icon}</span>
      <p>{label}</p>
    </div>
  )
}

export default SideBarNavigationCard
