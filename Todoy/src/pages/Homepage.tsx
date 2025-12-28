import { useState } from 'react'
import TabsNavigation from '../shared/components/navigationCards/TabsNavigation'
import HomeTask from '../shared/components/tasks/HomeTask'
import { HomeTabName, ITask } from '../shared/components/tasks/tasksTypes'

const date = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric'
})

const dayPeriod = new Date().toLocaleTimeString('en-US', { dayPeriod: 'long' })
const periodArray = dayPeriod.split(' ')

const tasks: ITask[] = [
  { id: 1, title: 'Buy milk', completed: false, deleted: false },
  { id: 2, title: 'Reply emails', completed: false, deleted: false },
  { id: 3, title: 'Workout', completed: false, deleted: false },
  { id: 4, title: 'Project meeting', completed: true, deleted: false },
  { id: 5, title: 'Doctor appointment', completed: true, deleted: false },
  { id: 6, title: 'Pay bills', completed: false, deleted: true },
  { id: 7, title: 'Clean room', completed: false, deleted: true }
]

const tabs = {
  Active: tasks.filter((task) => !task.completed && !task.deleted),
  Completed: tasks.filter((task) => task.completed && !task.deleted),
  Deleted: tasks.filter((task) => task.deleted)
}

const tabsList = Object.keys(tabs)

const Homepage = () => {
  const [activeTab, setActiveTab] = useState<string>('Active')

  return (
    <main className='homePage-wrapper'>
      <div className='homePage-topBar'>
        <div className='homePage-topBar-greeting'>
          <span>{date}</span>
          <h1>{`Good ${periodArray[periodArray.length - 1]}, extranger`}</h1>
        </div>
        <div className='homePage-topBar-report'>
          <div className='homePage-topBar-report-tasks'>
            <span className='material-symbols-rounded'>check</span>
            <p>N</p>
            <p>tasks completed</p>
          </div>
        </div>
      </div>
      <div className='homePage-main'>
        <div className='homePage-main-topBar'>
          <div className='homePage-main-topBar-avatar'>NA</div>
          <div>
            <span className='homePage-main-topBar-title'>My tasks</span>
            <TabsNavigation setActiveTab={setActiveTab} activeTab={activeTab} tabsList={tabsList} />
          </div>
        </div>
        {activeTab === 'Active' && <HomeActiveTasksView />}
        {activeTab === 'Completed' && <HomeTasksView tabName='Completed' />}
        {activeTab === 'Deleted' && <HomeTasksView tabName='Deleted' />}
      </div>
    </main>
  )
}

const HomeActiveTasksView = () => {
  return (
    <div className='homePage-main-tasksContainer'>
      <div className='homePage-main-createTaskButton'>Create task</div>
      <div className='homePage-main-taskList'>
        {tabs.Active.map((task) => (
          <HomeTask task={task} key={`Active-${task.title}`} />
        ))}
      </div>
    </div>
  )
}

const HomeTasksView = ({ tabName }: { tabName: HomeTabName }) => {
  return (
    <div className='homePage-main-tasksContainer'>
      <div className='homePage-main-taskList'>
        {tabs[tabName].map((task: ITask) => (
          <HomeTask task={task} key={`${tabName}-${task.title}`} />
        ))}
      </div>
    </div>
  )
}

export default Homepage
