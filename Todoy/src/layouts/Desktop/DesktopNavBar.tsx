import { Icon, IconButton } from '../../shared/components/icons/icons'
import { useTasks } from '../../shared/hooks/useTasks'
import { IDesktopNavBarProps } from './desktopTypes'

const DesktopNavBar = ({ setSideBarHidden, sideBarHidden }: IDesktopNavBarProps) => {
  const { filter } = useTasks()

  return (
    <div className='desktop-navBar' onClick={() => setSideBarHidden(sideBarHidden ? '' : 'hidden')}>
      <IconButton icon='menu' className='burger-button' type='thin' />
      <div className='search-bar-container'>
        <Icon icon='search' className='search-bar-icon' type='thin' />
        <form className='search-bar-form' onSubmit={(event) => event.preventDefault()}>
          <input className='search-bar-input' placeholder='Search' onChange={(event) => filter(event.target.value)} />
        </form>
      </div>
    </div>
  )
}

export default DesktopNavBar
