import { useMemo, useState, useEffect } from 'react'
import TabsNavigation from '../../shared/components/navigationCards/TabsNavigation'
import HomeTask from '../../features/tasks/HomeTask'
import { IHomeActiveTasksViewProps, IHomeTasksView, WIDGET_TASK_TABS } from '../pagesTypes'
import { CreateTaskButton } from '../../shared/components/buttons/buttons'
import { useTasks } from '../../shared/hooks/useTasks'

const tabsList = WIDGET_TASK_TABS

export const TasksWidget = () => {
  const { tasks, createTask, updateTask } = useTasks()
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

  useEffect(() => setFocusedTaskId(null), [activeTab])

  const handleClick = () => {
    if (!tasks[0].title) {
      setFocusedTaskId(tasks[0].id)
      return
    }

    const newTaskId = Date.now()
    createTask({ title: '', id: newTaskId })
    setFocusedTaskId(newTaskId)
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
        <HomeActiveTasksView
          widgetTasks={widgetTasks.Active}
          handleClick={handleClick}
          focused={focusedTaskId}
          setFocusedTaskId={setFocusedTaskId}
          updateTask={updateTask}
        />
      ) : (
        <HomeTasksView widgetTasks={widgetTasks[activeTab as keyof typeof widgetTasks]} updateTask={updateTask} />
      )}
    </div>
  )
}

const HomeActiveTasksView = ({
  widgetTasks,
  handleClick,
  focused,
  setFocusedTaskId,
  updateTask
}: IHomeActiveTasksViewProps) => {
  const handleOnBlur = () => setFocusedTaskId!(null)

  return (
    <div className='task-widget-tasksContainer'>
      <div className='task-widget-tasksContainer-topBar'>
        <CreateTaskButton handleClick={handleClick} />
      </div>
      <div className='task-widget-taskList active-tab'>
        {widgetTasks.map((task) => (
          <HomeTask
            key={task.id}
            task={task}
            autofocus={task.id === focused}
            onBlur={handleOnBlur}
            updateTask={updateTask}
          />
        ))}
      </div>
    </div>
  )
}

const HomeTasksView = ({ widgetTasks, updateTask }: IHomeTasksView) => {
  return (
    <div className='task-widget-tasksContainer'>
      <div className='task-widget-taskList'>
        {widgetTasks.map((task) => (
          <HomeTask key={task.id} task={task} updateTask={updateTask} />
        ))}
      </div>
    </div>
  )
}
