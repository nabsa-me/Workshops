import { render, screen, fireEvent } from '@testing-library/react'
import { TaskButton, DeleteButton, CreateTaskButton } from './buttons'
import { useDoneEffectStore, useTasksStore } from '../../../app/store'

const tasks = [
  { id: 1, title: 'Buy Milk', completed: false, deleted: false },
  { id: 2, title: 'Go Gym', completed: true, deleted: false },
  { id: 3, title: 'Read Book', completed: false, deleted: true }
]

const setDoneTask = jest.fn()

describe('TaskButton', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()

    // reset doneEffect store and provide setter spy
    useDoneEffectStore.setState({
      doneEffect: 0,
      setDoneEffectSelector: jest.fn((doneEffect) => {
        useDoneEffectStore.setState(() => ({
          doneEffect
        }))
      })
    })

    // stub task-related selectors so we can verify calls
    useTasksStore.setState({
      completeTaskSelector: jest.fn(),
      cleanTaskSelector: jest.fn(),
      deleteTaskSelector: jest.fn()
    })
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('renders correctly with default props', () => {
    render(<TaskButton doneTask='' status='' setDoneTask={setDoneTask} task={tasks[0]} />)

    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(2)
    expect(buttons[0]).toHaveTextContent('check_circle')
  })

  it('applies done and status classes correctly', () => {
    render(<TaskButton doneTask='done' status='completed' setDoneTask={setDoneTask} task={tasks[0]} />)

    const container = screen.getAllByRole('button')[0].parentElement
    expect(container).toHaveClass('done')
    expect(container).toHaveClass('completed')
  })

  it('toggles doneTask and updates doneEffect on default click path', () => {
    useDoneEffectStore.setState({ doneEffect: 5 })

    render(<TaskButton doneTask='' status='' setDoneTask={setDoneTask} task={tasks[0]} />)

    fireEvent.click(screen.getAllByRole('button')[0])
    expect(setDoneTask).toHaveBeenCalledWith('done')
    expect(useDoneEffectStore.getState().setDoneEffectSelector).toHaveBeenCalledWith(4)

    // completeTask should fire after 750ms
    expect(useTasksStore.getState().completeTaskSelector).not.toHaveBeenCalled()
    jest.advanceTimersByTime(750)
    expect(useTasksStore.getState().completeTaskSelector).toHaveBeenCalledWith(tasks[0].id)
  })

  it('toggles back when doneTask already set', () => {
    useDoneEffectStore.setState({ doneEffect: 2 })

    render(<TaskButton doneTask='done' status='' setDoneTask={setDoneTask} task={tasks[0]} />)

    fireEvent.click(screen.getAllByRole('button')[0])
    expect(setDoneTask).toHaveBeenCalledWith('')
    expect(useDoneEffectStore.getState().setDoneEffectSelector).toHaveBeenCalledWith(1)

    jest.advanceTimersByTime(750)
    expect(useTasksStore.getState().completeTaskSelector).toHaveBeenCalledWith(tasks[0].id)
  })

  it('handles completed task branch and toggles undone', () => {
    const completedTask = { ...tasks[0], completed: true }
    render(<TaskButton doneTask='' status='' setDoneTask={setDoneTask} task={completedTask} />)

    fireEvent.click(screen.getAllByRole('button')[0])
    expect(setDoneTask).toHaveBeenCalledWith('undone')

    // completeTask after 350ms
    jest.advanceTimersByTime(350)
    expect(useTasksStore.getState().completeTaskSelector).toHaveBeenCalledWith(completedTask.id)
  })

  it('toggles undone state when doneTask was "undone" on completed task', () => {
    const completedTask = { ...tasks[0], completed: true }
    render(<TaskButton doneTask='undone' status='' setDoneTask={setDoneTask} task={completedTask} />)

    fireEvent.click(screen.getAllByRole('button')[0])
    expect(setDoneTask).toHaveBeenCalledWith('')
    jest.advanceTimersByTime(350)
    expect(useTasksStore.getState().completeTaskSelector).toHaveBeenCalledWith(completedTask.id)
  })

  it('deletes blank title task via cleanTask and toggles undone when doneTask empty', () => {
    const blankTask = { ...tasks[0], title: '   ' }
    render(<TaskButton doneTask='' status='' setDoneTask={setDoneTask} task={blankTask} />)

    fireEvent.click(screen.getAllByRole('button')[0])
    expect(setDoneTask).toHaveBeenCalledWith('undone')

    jest.advanceTimersByTime(350)
    expect(useTasksStore.getState().cleanTaskSelector).toHaveBeenCalledWith(blankTask.id)
  })

  it('deletes blank title task via cleanTask and toggles back when doneTask already undone', () => {
    const blankTask = { ...tasks[0], title: '   ' }
    render(<TaskButton doneTask='undone' status='' setDoneTask={setDoneTask} task={blankTask} />)

    fireEvent.click(screen.getAllByRole('button')[0])
    expect(setDoneTask).toHaveBeenCalledWith('')

    jest.advanceTimersByTime(350)
    expect(useTasksStore.getState().cleanTaskSelector).toHaveBeenCalledWith(blankTask.id)
  })

  it('completes deleted task without toggling state', () => {
    const deletedTask = { ...tasks[0], deleted: true }
    render(<TaskButton doneTask='' status='' setDoneTask={setDoneTask} task={deletedTask} />)

    fireEvent.click(screen.getAllByRole('button')[0])
    // setDoneTask and doneEffect selector should not be called during this branch
    expect(setDoneTask).not.toHaveBeenCalled()
    expect(useDoneEffectStore.getState().setDoneEffectSelector).not.toHaveBeenCalled()

    jest.advanceTimersByTime(350)
    expect(useTasksStore.getState().completeTaskSelector).toHaveBeenCalledWith(deletedTask.id)
  })
})

describe('DeleteButton', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    useDoneEffectStore.setState({
      doneEffect: 0,
      setDoneEffectSelector: jest.fn((doneEffect) => {
        useDoneEffectStore.setState(() => ({ doneEffect }))
      })
    })
    useTasksStore.setState({
      deleteTaskSelector: jest.fn(),
      cleanTaskSelector: jest.fn()
    })
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('renders delete icon correctly', () => {
    render(<DeleteButton icon='delete' doneTask='' task={tasks[0]} setDoneTask={setDoneTask} />)

    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('delete')
    expect(button).toHaveClass('task-delete-button')
  })

  it('renders restore icon correctly', () => {
    render(<DeleteButton icon='restore_from_trash' doneTask='done' task={tasks[0]} setDoneTask={setDoneTask} />)

    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('restore_from_trash')
    expect(button).toHaveClass('task-restore_from_trash-button')
  })

  it('applies done class when doneTask is set', () => {
    render(<DeleteButton icon='delete' doneTask='done' task={tasks[0]} setDoneTask={setDoneTask} />)

    const wrapper = screen.getByRole('button').parentElement
    expect(wrapper).toHaveClass('done')
  })

  it('deletes non-blank task after delay and decrements effect when doneTask empty', () => {
    useDoneEffectStore.setState({ doneEffect: 4 })

    render(<DeleteButton icon='delete' doneTask='' task={tasks[0]} setDoneTask={setDoneTask} />)
    fireEvent.click(screen.getByRole('button'))

    expect(setDoneTask).toHaveBeenCalledWith('undone')
    expect(useDoneEffectStore.getState().setDoneEffectSelector).toHaveBeenCalledWith(3)
    expect(useTasksStore.getState().deleteTaskSelector).not.toHaveBeenCalled()

    jest.advanceTimersByTime(750)
    expect(useTasksStore.getState().deleteTaskSelector).toHaveBeenCalledWith(tasks[0].id)
  })

  it('deletes non-blank task and toggles back when already undone', () => {
    useDoneEffectStore.setState({ doneEffect: 2 })

    render(<DeleteButton icon='delete' doneTask='undone' task={tasks[0]} setDoneTask={setDoneTask} />)
    fireEvent.click(screen.getByRole('button'))

    expect(setDoneTask).toHaveBeenCalledWith('')
    expect(useDoneEffectStore.getState().setDoneEffectSelector).toHaveBeenCalledWith(1)

    jest.advanceTimersByTime(750)
    expect(useTasksStore.getState().deleteTaskSelector).toHaveBeenCalledWith(tasks[0].id)
  })

  it('cleans blank-title non-deleted task quickly when doneTask empty', () => {
    const blank = { ...tasks[0], title: '' }
    render(<DeleteButton icon='delete' doneTask='' task={blank} setDoneTask={setDoneTask} />)

    fireEvent.click(screen.getByRole('button'))
    expect(setDoneTask).toHaveBeenCalledWith('undone')
    expect(useTasksStore.getState().cleanTaskSelector).not.toHaveBeenCalled()

    jest.advanceTimersByTime(350)
    expect(useTasksStore.getState().cleanTaskSelector).toHaveBeenCalledWith(blank.id)
  })

  it('cleans blank-title non-deleted task and toggles back when already undone', () => {
    const blank = { ...tasks[0], title: '' }
    render(<DeleteButton icon='delete' doneTask='undone' task={blank} setDoneTask={setDoneTask} />)

    fireEvent.click(screen.getByRole('button'))
    expect(setDoneTask).toHaveBeenCalledWith('')

    jest.advanceTimersByTime(350)
    expect(useTasksStore.getState().cleanTaskSelector).toHaveBeenCalledWith(blank.id)
  })

  it('uses deleteTask path when task is already deleted even if title blank', () => {
    const del = { ...tasks[0], title: '', deleted: true }
    render(<DeleteButton icon='delete' doneTask='' task={del} setDoneTask={setDoneTask} />)

    fireEvent.click(screen.getByRole('button'))
    jest.advanceTimersByTime(750)
    expect(useTasksStore.getState().deleteTaskSelector).toHaveBeenCalledWith(del.id)
  })
})

describe('CreateTaskButton', () => {
  it('renders button and text correctly', () => {
    const handleClick = jest.fn()
    render(<CreateTaskButton handleClick={handleClick} />)

    expect(screen.getByText('Create task')).toBeInTheDocument()
    expect(screen.getByText('add')).toBeInTheDocument()
  })

  it('calls handleClick when clicked', () => {
    const handleClick = jest.fn()
    render(<CreateTaskButton handleClick={handleClick} />)

    fireEvent.click(screen.getAllByRole('button')[0])
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
