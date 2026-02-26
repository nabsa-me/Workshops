import { render, fireEvent, screen } from '@testing-library/react'
import HomeTask from './HomeTask'
import { useDoneEffectStore, useTasksStore } from '../../app/store'

jest.mock('../../features/tasks/taskApi', () => ({
  getTasks: jest.fn().mockResolvedValue([]),
  createTask: jest.fn().mockResolvedValue(undefined),
  updateTask: jest.fn().mockResolvedValue(undefined)
}))

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

  it('sets selected state when input is clicked', () => {
    const { container } = render(<HomeTask task={useTasksStore.getState().tasks[0]} />)

    const input = container.querySelector('input') as HTMLInputElement
    const wrapper = container.querySelector('.homePage-taskItem-task')
    fireEvent.click(input)
    expect(wrapper?.className).toContain('selected')
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

  it('clears selected state when clicking outside (edge case)', () => {
    const { container } = render(<HomeTask task={useTasksStore.getState().tasks[0]} />)

    const input = container.querySelector('input') as HTMLInputElement
    fireEvent.click(input)
    fireEvent.mouseUp(document.body)
    expect(container.querySelector('.selected')).toBeNull()
  })

  it('adds inactive class when task is completed', () => {
    const { container } = render(<HomeTask task={useTasksStore.getState().tasks[1]} />)
    expect(container.querySelector('.inactive')).toBeTruthy()
  })

  it('adds inactive class when task is deleted (edge case)', () => {
    const { container } = render(<HomeTask task={useTasksStore.getState().tasks[2]} />)
    expect(container.querySelector('.inactive')).toBeTruthy()
  })

  it('adds special class when doneEffect is falsy (edge case)', () => {
    useDoneEffectStore.setState({
      doneEffect: 0
    })
    const { container } = render(<HomeTask task={useTasksStore.getState().tasks[0]} />)
    expect(container.querySelector('.special')).toBeTruthy()
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
})
