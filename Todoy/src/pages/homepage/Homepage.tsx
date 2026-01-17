import { Icon } from '../../shared/components/icons/icons'
import { TasksWidget } from './TasksWidget'

const Homepage = () => {
  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  })

  const dayPeriod = new Date().toLocaleTimeString('en-US', { dayPeriod: 'long' })
  const periodArray = dayPeriod.split(' ')
  return (
    <main className='homePage-wrapper'>
      <div className='homePage-topBar'>
        <div className='homePage-topBar-greeting'>
          <span>{date}</span>
          <h1>{`Good ${periodArray[periodArray.length - 1]}, extranger`}</h1>
        </div>
        <div className='homePage-topBar-report'>
          <div className='homePage-topBar-report-tasks'>
            <Icon icon='check' type='bold' />
            <p>N</p>
            <p>tasks completed</p>
          </div>
        </div>
      </div>
      <TasksWidget />
    </main>
  )
}

export default Homepage
