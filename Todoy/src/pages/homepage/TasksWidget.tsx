import { useMemo, useState } from 'react'
import TabsNavigation from '../../shared/components/navigationCards/TabsNavigation'
import HomeTask from '../../features/tasks/HomeTask'
import { ITask } from '../../features/tasks/tasksTypes'
import { IHomeActiveTasksViewProps, WIDGET_TASK_TABS } from '../pagesTypes'
import { CreateTaskButton } from '../../shared/components/buttons/buttons'
import { useTasks } from '../../shared/hooks/useTasks'

const tabsList = WIDGET_TASK_TABS

export const TasksWidget = () => {
  const { tasks, createTask } = useTasks()
  const [activeTab, setActiveTab] = useState<string>('Active')
  const [focusedTaskId, setFocusedTaskId] = useState<number | null>(null)

  const widgetTasks = useMemo(
    () => ({
      Active: tasks.filter((task) => !task.completed && !task.deleted),
      Completed: tasks.filter((task) => task.completed && !task.deleted),
      Deleted: tasks.filter((task) => task.deleted)
    }),
    [tasks]
  )

  const handleClick = () => {
    const newTaskId = Date.now()

    createTask({ title: '', id: newTaskId })
    setFocusedTaskId(newTaskId)
  }
  console.log(tasks)

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
        <HomeActiveTasksView widgetTasks={widgetTasks.Active} handleClick={handleClick} focused={focusedTaskId} />
      ) : (
        <HomeTasksView widgetTasks={widgetTasks[activeTab as keyof typeof widgetTasks]} />
      )}
    </div>
  )
}

const HomeActiveTasksView = ({ widgetTasks, handleClick, focused, setFocusedTaskId }: IHomeActiveTasksViewProps) => {
  const handleOnBlur = () => setFocusedTaskId?.(null)

  return (
    <div className='task-widget-tasksContainer'>
      <div className='task-widget-tasksContainer-topBar'>
        <CreateTaskButton handleClick={() => handleClick()} />
      </div>
      <div className='task-widget-taskList active-tab'>
        {widgetTasks?.map((task) => (
          <HomeTask task={task} key={task.id} autofocus={task.id === focused} onBlur={handleOnBlur} />
        ))}
      </div>
    </div>
  )
}

const HomeTasksView = ({ widgetTasks }: { widgetTasks: ITask[] }) => {
  return (
    <div className='task-widget-tasksContainer'>
      <div className='task-widget-taskList'>
        {widgetTasks?.map((task: ITask) => (
          <HomeTask task={task} key={task.id} />
        ))}
      </div>
    </div>
  )
}
