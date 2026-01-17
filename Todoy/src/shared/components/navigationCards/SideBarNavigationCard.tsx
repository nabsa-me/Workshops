import { Icon } from '../icons/icons'

const SideBarNavigationCard = ({ label, icon }: { label: string; icon: string }) => {
  return (
    <div className='sideBar-navigationCard'>
      <Icon icon={icon} className='sideBar-icon' />
      <p>{label}</p>
    </div>
  )
}

export default SideBarNavigationCard
