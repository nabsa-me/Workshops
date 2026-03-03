import { render, fireEvent, screen } from '@testing-library/react'
import HomeTask from './HomeTask'
import { useDoneEffectStore, useTasksStore } from '../../app/store'

jest.mock('../../features/tasks/taskApi', () => ({
  getTasks: jest.fn().mockResolvedValue([]),
  createTask: jest.fn().mockResolvedValue(undefined),
  updateTask: jest.fn().mockResolvedValue(undefined)
}))

const defaultTask = { id: 1, title: 'Buy Milk', completed: false, deleted: false }
const renderTask = (task = defaultTask, props: any = {}) => {
  const utils = render(<HomeTask task={task} {...props} />)
  const input = utils.container.querySelector('input') as HTMLInputElement
  const wrapper = utils.container.querySelector('.homePage-taskItem-task') as HTMLDivElement
  const form = utils.container.querySelector('form') as HTMLFormElement
  return { ...utils, input, wrapper, form }
}

describe('HomeTask', () => {
  beforeEach(() => {
    useTasksStore.setState({
      tasks: [
        { id: 1, title: 'Buy Milk', completed: false, deleted: false },
        { id: 2, title: 'Go Gym', completed: true, deleted: false },
        { id: 3, title: 'Read Book', completed: false, deleted: true }
      ],
      isLoading: false,
      error: null,
      updateTaskSelector: jest.fn((id, updates) => {
        useTasksStore.setState((state) => ({
          tasks: state.tasks.map((task) => (task.id === id ? { ...task, ...updates } : task))
        }))
      })
    })
    jest.clearAllMocks()
  })

  it('renders task title', () => {
    render(<HomeTask task={useTasksStore.getState().tasks[0]} autofocus={false} />)
    expect(screen.getByDisplayValue('Buy Milk')).toBeInTheDocument()
  })

  it('applies autofocus and selected class when autofocus is true', () => {
    const { container } = render(<HomeTask task={useTasksStore.getState().tasks[0]} autofocus={true} />)

    const input = container.querySelector('input') as HTMLInputElement
    const wrapper = container.querySelector('.homePage-taskItem-task')
    expect(document.activeElement).toBe(input)
    expect(wrapper?.className).toContain('selected')
  })

  it('does not autofocus when autofocus is false', () => {
    const { container } = render(<HomeTask task={useTasksStore.getState().tasks[0]} autofocus={false} />)

    const input = container.querySelector('input') as HTMLInputElement
    expect(document.activeElement).not.toBe(input)
  })

  it('calls onFocus and manages selection on click/focus/outside', () => {
    const onFocus = jest.fn()
    const { input, wrapper } = renderTask(defaultTask, { onFocus })

    fireEvent.click(input)
    expect(onFocus).toHaveBeenCalledTimes(1)
    expect(wrapper.className).toContain('selected')

    fireEvent.focus(input)
    expect(onFocus).toHaveBeenCalledTimes(2)

    fireEvent.mouseUp(wrapper) // clicking inside should not clear
    expect(wrapper.className).toContain('selected')

    fireEvent.mouseUp(document.body) // outside clears selection
    expect(wrapper.className).not.toContain('selected')
  })

  it('preserves selected state and keeps focus when submitting an empty task and calls submit handler', () => {
    const handleSubmit = jest.fn()
    const { container } = render(
      <HomeTask task={{ id: 99, title: '', completed: false, deleted: false }} handleTaskSubmit={handleSubmit} />
    )

    const form = container.querySelector('form') as HTMLFormElement
    const input = container.querySelector('input') as HTMLInputElement

    fireEvent.click(input)
    fireEvent.submit(form)

    expect(container.querySelector('.selected')).toBeTruthy()
    expect(handleSubmit).toHaveBeenCalledWith({ id: 99, title: '', completed: false, deleted: false })
  })

  it('calls submit handler when non-empty and blurs input', () => {
    const handleSubmit = jest.fn()
    const { container } = render(
      <HomeTask task={{ id: 100, title: 'foo', completed: false, deleted: false }} handleTaskSubmit={handleSubmit} />
    )

    const form = container.querySelector('form') as HTMLFormElement
    const input = container.querySelector('input') as HTMLInputElement

    fireEvent.submit(form)
    expect(handleSubmit).toHaveBeenCalledWith({ id: 100, title: 'foo', completed: false, deleted: false })
    expect(document.activeElement).not.toBe(input)
  })

  it('updates task title on blur trimming whitespace and calls onBlur', () => {
    const onBlur = jest.fn()
    useTasksStore.setState({
      updateTaskSelector: jest.fn((id, updates) => {
        useTasksStore.setState((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t))
        }))
      })
    })

    const task = { id: 42, title: '  spaced  ', completed: false, deleted: false }
    const { container } = render(<HomeTask task={task} onBlur={onBlur} />)
    const input = container.querySelector('input') as HTMLInputElement

    fireEvent.change(input, { target: { value: '  spaced  ' } })
    fireEvent.blur(input)

    expect(useTasksStore.getState().updateTaskSelector).toHaveBeenCalledWith(42, { title: 'spaced' })
    expect(onBlur).toHaveBeenCalled()
  })

  it('does not update task on blur if trimmed value is empty', () => {
    useTasksStore.setState({
      updateTaskSelector: jest.fn()
    })

    const task = { id: 43, title: '', completed: false, deleted: false }
    const { container } = render(<HomeTask task={task} />)
    const input = container.querySelector('input') as HTMLInputElement

    input.value = '   '
    fireEvent.blur(input)
    expect(useTasksStore.getState().updateTaskSelector).not.toHaveBeenCalled()
  })

  it('assigns size attribute based on title length', () => {
    const short = { id: 50, title: '', completed: false, deleted: false }
    const long = { id: 51, title: 'abcdef', completed: false, deleted: false }
    const { container: c1 } = render(<HomeTask task={short} />)
    const { container: c2 } = render(<HomeTask task={long} />)
    expect(c1.querySelector('input')?.getAttribute('size')).toBe('1')
    expect(c2.querySelector('input')?.getAttribute('size')).toBe('6')
  })

  it('adds special class only when doneEffect is falsy', () => {
    const { act } = require('@testing-library/react')
    act(() => {
      useDoneEffectStore.setState({ doneEffect: 1 })
    })

    const { container: c1 } = render(<HomeTask task={useTasksStore.getState().tasks[0]} />)
    expect(c1.querySelector('.special')).toBeNull()

    act(() => {
      useDoneEffectStore.setState({ doneEffect: 0 })
    })
    const { container: c2 } = render(<HomeTask task={useTasksStore.getState().tasks[0]} />)
    expect(c2.querySelector('.special')).toBeTruthy()
  })

  it('registers and removes mouseup listener on mount/unmount', () => {
    const add = jest.spyOn(document, 'addEventListener')
    const remove = jest.spyOn(document, 'removeEventListener')
    const { unmount } = render(<HomeTask task={useTasksStore.getState().tasks[0]} />)

    expect(add).toHaveBeenCalledWith('mouseup', expect.any(Function))
    unmount()
    expect(remove).toHaveBeenCalledWith('mouseup', expect.any(Function))
    add.mockRestore()
    remove.mockRestore()
  })

  it('calls updateTaskSelector when input value changes', () => {
    const { container } = render(<HomeTask task={useTasksStore.getState().tasks[0]} />)

    const input = container.querySelector('input') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'Updated task' } })

    expect(useTasksStore.getState().updateTaskSelector).toHaveBeenCalledWith(1, { title: 'Updated task' })
  })

  it('clears selected state and blurs input on submit', () => {
    const { container } = render(<HomeTask task={useTasksStore.getState().tasks[0]} />)
    const form = container.querySelector('form') as HTMLFormElement
    const input = container.querySelector('input') as HTMLInputElement

    fireEvent.click(input)
    fireEvent.submit(form)

    expect(container.querySelector('.selected')).toBeNull()
    expect(document.activeElement).not.toBe(input)
  })

  it('adds inactive class when task is completed', () => {
    const { container } = render(<HomeTask task={useTasksStore.getState().tasks[1]} />)
    expect(container.querySelector('.inactive')).toBeTruthy()
  })

  it('adds inactive class when task is deleted (edge case)', () => {
    const { container } = render(<HomeTask task={useTasksStore.getState().tasks[2]} />)
    expect(container.querySelector('.inactive')).toBeTruthy()
  })

  it('calls onBlur callback when input blurs', () => {
    const onBlur = jest.fn()
    const { container } = render(<HomeTask task={useTasksStore.getState().tasks[0]} onBlur={onBlur} />)
    const input = container.querySelector('input') as HTMLInputElement

    fireEvent.blur(input)
    expect(onBlur).toHaveBeenCalledTimes(1)
  })

  it('does NOT clear selected state when clicking inside the task (handleClickOutside negative path)', () => {
    const { container } = render(<HomeTask task={useTasksStore.getState().tasks[0]} />)
    const input = container.querySelector('input') as HTMLInputElement
    const wrapper = container.querySelector('.homePage-taskItem-task') as HTMLDivElement

    fireEvent.click(input)
    expect(wrapper.className).toContain('selected')

    fireEvent.mouseUp(wrapper)
    expect(wrapper.className).toContain('selected')
  })
})

describe('HomeTask integrations with TaskButton and DeleteButton', () => {
  it('toggles done state when TaskButton is clicked', () => {
    const { container } = render(<HomeTask task={useTasksStore.getState().tasks[0]} />)
    const wrapper = container.querySelector('.homePage-taskItem-task') as HTMLDivElement
    const taskButton = container.querySelector('.task-button') as HTMLDivElement

    expect(wrapper.className).not.toContain('done')
    fireEvent.click(taskButton)

    expect(wrapper.className).toContain('done')
    fireEvent.click(taskButton)
    expect(wrapper.className).not.toContain('done')
  })

  it('applies completed status class to TaskButton when task is completed', () => {
    const { container } = render(<HomeTask task={useTasksStore.getState().tasks[1]} />)
    const taskButton = container.querySelector('.task-button.completed')

    expect(taskButton).toBeTruthy()
  })

  it('renders delete icon when task is not deleted', () => {
    const { container } = render(<HomeTask task={useTasksStore.getState().tasks[0]} />)

    expect(container.textContent).toContain('delete')
    expect(container.textContent).not.toContain('restore_from_trash')
  })

  it('renders restore icon when task is deleted (integration with DeleteButton)', () => {
    const { container } = render(<HomeTask task={useTasksStore.getState().tasks[2]} />)

    expect(container.textContent).toContain('restore_from_trash')
    expect(container.textContent).not.toContain('delete')
  })

  it('DeleteButton reflects done state visually when task is marked as done', () => {
    const { container } = render(<HomeTask task={useTasksStore.getState().tasks[0]} />)
    const taskButton = container.querySelector('.task-button') as HTMLDivElement

    fireEvent.click(taskButton)
    const deleteButtonWrapper = container.querySelector('.task-button.done')
    expect(deleteButtonWrapper).toBeTruthy()
  })

  describe('taskApi and tasksFile utilities', () => {
    it('tasksFile exports the expected array of tasks', () => {
      const { tasks } = require('./tasksFile')

      expect(Array.isArray(tasks)).toBe(true)
      expect(tasks.length).toBeGreaterThan(0)
      expect(tasks.find((t: any) => t.title === 'Buy milk')).toBeTruthy()
    })

    it('taskApi functions call console.log and return promises', async () => {
      const api = jest.requireActual('./taskApi')
      const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})

      await api.createTask({ id: 1, title: 'x', completed: false, deleted: false })
      expect(logSpy).toHaveBeenCalledWith('backend create', { id: 1, title: 'x', completed: false, deleted: false })

      await api.updateTask(2, { title: 'hi' })
      expect(logSpy).toHaveBeenCalledWith('backend update', 2, { title: 'hi' })

      await api.completeTask(3)
      expect(logSpy).toHaveBeenCalledWith('backend complete', 3)

      await api.deleteTask(4)
      expect(logSpy).toHaveBeenCalledWith('backend delete', 4)

      await api.cleanTask(5)
      expect(logSpy).toHaveBeenCalledWith('backend clean', 5)

      await expect(api.getTasks()).resolves.toEqual(require('./tasksFile').tasks)

      logSpy.mockRestore()
    })
  })
})
