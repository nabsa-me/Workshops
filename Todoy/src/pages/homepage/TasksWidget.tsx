import { useState } from 'react'
import { CreateTaskButton } from '../../shared/components/buttons/buttons'
import TabsNavigation from '../../shared/components/navigationCards/TabsNavigation'
import HomeTask from '../../features/tasks/components/HomeTask'
import { ITask } from '../../features/tasks/tasksTypes'
import { WIDGET_TASK_TABS } from '../pagesTypes'

const tasks: ITask[] = [
  { id: 1, title: 'Buy milk', completed: false, deleted: false },
  { id: 2, title: 'Reply emails', completed: false, deleted: false },
  { id: 3, title: 'Workout', completed: false, deleted: false },
  { id: 4, title: 'Project meeting', completed: true, deleted: false },
  { id: 5, title: 'Doctor appointment', completed: true, deleted: false },
  { id: 6, title: 'Pay bills', completed: false, deleted: true },
  { id: 7, title: 'Clean room', completed: false, deleted: true }
]
const tabsList = WIDGET_TASK_TABS

export const TasksWidget = () => {
  const [activeTab, setActiveTab] = useState<string>('Active')
  const [focusedTaskId, setFocusedTaskId] = useState<number | null>(null)
  const [widgetTasks, setWidgetTasks] = useState<Record<string, ITask[]>>({
    Active: tasks.filter((task) => !task.completed && !task.deleted),
    Completed: tasks.filter((task) => task.completed && !task.deleted),
    Deleted: tasks.filter((task) => task.deleted)
  })

  const handleClick = () => {
    const newTask: ITask = {
      id: Date.now(),
      title: '',
      completed: false,
      deleted: false
    }

    setWidgetTasks({ ...widgetTasks, Active: [newTask, ...widgetTasks.Active] })
    setFocusedTaskId(newTask.id)
  }

  return (
    <div className='widget-container full'>
      <div className='task-widget-topBar'>
        <div className='task-widget-topBar-avatar'>NA</div>
        <div>
          <span className='task-widget-topBar-title'>My tasks</span>
          <TabsNavigation setActiveTab={setActiveTab} activeTab={activeTab} tabsList={tabsList} />
        </div>
      </div>
      {activeTab === 'Active' ? (
        <HomeActiveTasksView widgetTasks={widgetTasks[activeTab]} handleClick={handleClick} focused={focusedTaskId} />
      ) : (
        <HomeTasksView widgetTasks={widgetTasks[activeTab]} />
      )}
    </div>
  )
}

const HomeActiveTasksView = ({
  widgetTasks,
  handleClick,
  focused,
  setFocusedTaskId
}: {
  widgetTasks: ITask[]
  handleClick: () => void
  focused?: number | null
  setFocusedTaskId?: (id: number | null) => void
}) => {
  return (
    <div className='task-widget-tasksContainer'>
      <div className='task-widget-tasksContainer-topBar'>
        <CreateTaskButton handleClick={() => handleClick()} />
      </div>
      <div className='task-widget-taskList'>
        {widgetTasks.map((task) => (
          <HomeTask task={task} key={task.id} autofocus={task.id === focused} onBlur={() => setFocusedTaskId!(null)} />
        ))}
      </div>
    </div>
  )
}

const HomeTasksView = ({ widgetTasks }: { widgetTasks: ITask[] }) => {
  return (
    <div className='homePage-main-tasksContainer'>
      <div className='homePage-main-taskList'>
        {widgetTasks.map((task: ITask) => (
          <HomeTask task={task} key={task.id} />
        ))}
      </div>
    </div>
  )
}
