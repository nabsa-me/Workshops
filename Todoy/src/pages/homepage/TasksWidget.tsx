import { useMemo, useState, useEffect } from 'react'
import TabsNavigation from '../../shared/components/navigationCards/TabsNavigation'
import HomeTask from '../../features/tasks/HomeTask'
import { IHomeActiveTasksViewProps, IHomeTasksView, WIDGET_TASK_TABS } from '../pagesTypes'
import { CreateTaskButton } from '../../shared/components/buttons/buttons'
import { useTasks } from '../../shared/hooks/useTasks'
import { ITask } from '../../features/tasks/tasksTypes'

const tabsList = WIDGET_TASK_TABS

export const TasksWidget = () => {
  const [activeTab, setActiveTab] = useState<string>('Active')
  const [focusedTaskId, setFocusedTaskId] = useState<number | null>(null)

  const { tasks, createTask } = useTasks()

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
    if (tasks[0] && !tasks[0].title) {
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
        />
      ) : (
        <HomeTasksView widgetTasks={widgetTasks[activeTab as keyof typeof widgetTasks]} />
      )}
    </div>
  )
}

const HomeActiveTasksView = ({ widgetTasks, handleClick, focused, setFocusedTaskId }: IHomeActiveTasksViewProps) => {
  const handleOnBlur = () => setFocusedTaskId!(null)
  const { createTask, tasks, filterText } = useTasks()

  const tasksToRender: ITask[] = filterText?.length
    ? widgetTasks.filter((task) => task.title.toLowerCase().includes(filterText.toLowerCase()))
    : widgetTasks

  const handleTaskSubmit = (task: ITask) => {
    const taskIndex = tasks.findIndex((t) => t.id === task.id)

    if (task.title.trim() === '') {
      const currentId = task.id
      setFocusedTaskId(currentId)
      return
    }

    const nextTask = tasks[taskIndex + 1]

    if (nextTask && nextTask.title.trim() === '') {
      const nextId = nextTask.id
      setFocusedTaskId(nextId)
      return
    }

    const newTaskId = Date.now()
    createTask({ title: '', id: newTaskId, index: taskIndex + 1 })
    setFocusedTaskId(newTaskId)
  }

  return (
    <div className='task-widget-tasksContainer'>
      <div className='task-widget-tasksContainer-topBar'>
        <CreateTaskButton handleClick={handleClick} />
      </div>
      <div className='task-widget-taskList active-tab'>
        {tasksToRender.map((task) => (
          <HomeTask
            key={task.id}
            task={task}
            autofocus={task.id === focused}
            onBlur={handleOnBlur}
            onFocus={() => setFocusedTaskId(task.id)}
            handleTaskSubmit={handleTaskSubmit}
          />
        ))}
      </div>
    </div>
  )
}

const HomeTasksView = ({ widgetTasks }: IHomeTasksView) => {
  const { filterText } = useTasks()

  const tasksToRender: ITask[] = filterText?.length
    ? widgetTasks.filter((task) => task.title.toLowerCase().includes(filterText.toLowerCase()))
    : widgetTasks

  return (
    <div className='task-widget-tasksContainer'>
      <div className='task-widget-taskList'>
        {tasksToRender.map((task) => (
          <HomeTask key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}
