import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Homepage from './Homepage'
import { TasksWidget } from './TasksWidget'
import { useTasksStore } from '../../app/store/tasksStore'

jest.mock('../../features/tasks/taskApi', () => ({
  getTasks: jest.fn().mockResolvedValue([]),
  createTask: jest.fn().mockResolvedValue(undefined),
  updateTask: jest.fn().mockResolvedValue(undefined)
}))

describe('Homepage', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('renders layout structure', async () => {
    render(<Homepage />)
    expect(await screen.findByRole('main')).toHaveClass('homePage-wrapper')
    expect(screen.getByText('tasks completed')).toBeInTheDocument()
    expect(screen.getByText('My tasks')).toBeInTheDocument()
    expect(document.querySelector('.task-widget-topBar')).toBeInTheDocument()
  })

  it('renders greeting for morning', async () => {
    jest.setSystemTime(new Date('2024-01-15T09:00:00'))
    render(<Homepage />)
    expect(await screen.findByRole('heading', { name: /Good morning, extranger/i })).toBeInTheDocument()
  })

  it('renders greeting for noon', async () => {
    jest.setSystemTime(new Date('2024-01-01T12:00:00'))
    render(<Homepage />)
    expect(await screen.findByRole('heading', { name: /Good noon, extranger/i })).toBeInTheDocument()
  })

  it('renders greeting for afternoon', async () => {
    jest.setSystemTime(new Date('2024-01-01T13:00:00'))
    render(<Homepage />)
    expect(await screen.findByRole('heading', { name: /Good afternoon, extranger/i })).toBeInTheDocument()
  })

  it('renders greeting for evening', async () => {
    jest.setSystemTime(new Date('2024-01-01T19:00:00'))
    render(<Homepage />)
    expect(await screen.findByRole('heading', { name: /Good evening, extranger/i })).toBeInTheDocument()
  })

  it('renders greeting for night', async () => {
    jest.setSystemTime(new Date('2024-01-01T22:00:00'))
    render(<Homepage />)
    expect(await screen.findByRole('heading', { name: /Good night, extranger/i })).toBeInTheDocument()
  })
})

describe('TasksWidget', () => {
  beforeEach(() => {
    jest.spyOn(global.Date, 'now').mockImplementation(() => 123456789)
    useTasksStore.setState({
      tasks: [{ id: 1, title: 'Buy Milk', completed: false, deleted: false }],
      isLoading: false,
      error: null
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders top bar, avatar, title, and tabs', async () => {
    render(<TasksWidget />)
    expect(await screen.findByText('My tasks')).toBeInTheDocument()
    expect(screen.getByText('NA')).toBeInTheDocument()
    expect(screen.getByText('Active')).toBeInTheDocument()
    expect(screen.getByText('Completed')).toBeInTheDocument()
    expect(screen.getByText('Deleted')).toBeInTheDocument()
  })

  it('renders Active tasks by default', async () => {
    render(<TasksWidget />)
    const taskButton = document.querySelector('.task-button')
    expect(taskButton).not.toHaveClass('completed')
    expect(taskButton).not.toHaveClass('inactive')
  })

  it('renders Completed tasks when tab is clicked', async () => {
    const user = userEvent.setup()
    useTasksStore.setState({
      tasks: [{ id: 1, title: 'Buy Milk', completed: true, deleted: false }],
      isLoading: false,
      error: null
    })
    render(<TasksWidget />)
    await user.click(screen.getByText('Completed'))
    expect(document.querySelector('.homePage-taskItem-task')).toHaveClass('inactive')
    expect(document.querySelector('.task-button')).toHaveClass('completed')
  })

  it('renders Deleted tasks when tab is clicked', async () => {
    const user = userEvent.setup()
    useTasksStore.setState({
      tasks: [{ id: 1, title: 'Buy Milk', completed: false, deleted: true }],
      isLoading: false,
      error: null
    })
    render(<TasksWidget />)
    await user.click(screen.getByText('Deleted'))
    expect(document.querySelector('.homePage-taskItem-task')).toHaveClass('inactive')
  })

  it('creates new task and focuses it in Active tab', async () => {
    const user = userEvent.setup()
    render(<TasksWidget />)
    const createButton = screen.getByRole('button', { name: /create task/i })
    await user.click(createButton)
    const textElements = await screen.findAllByRole('textbox')
    expect(textElements[0]).toHaveValue('')
    expect(textElements[0]).toHaveFocus()
    const taskElements = screen.getAllByRole('listitem')
    expect(taskElements[0]).toHaveClass('selected')
  })

  it('resets focusedTaskId on task blur', async () => {
    const user = userEvent.setup()
    render(<TasksWidget />)
    await user.click(screen.getByRole('button', { name: /create task/i }))
    const input = await screen.findAllByRole('textbox')
    expect(input[0]).toHaveFocus()
    await user.click(document.body)
    expect(input[0]).not.toHaveFocus()
  })

  it('resets focusedTaskId when switching tabs', async () => {
    const user = userEvent.setup()
    render(<TasksWidget />)
    await user.click(screen.getByRole('button', { name: /create task/i }))
    let taskInputs = await screen.findAllByRole('textbox')
    expect(taskInputs[0]).toHaveFocus()
    await user.click(screen.getByText('Completed'))
    taskInputs = screen.queryAllByRole('textbox')
    taskInputs.forEach((task) => expect(task).not.toHaveFocus())
  })

  it('continually moves focus to existing empty task after submitting previous one', async () => {
    const user = userEvent.setup()

    // start with an empty list so our assumptions hold
    useTasksStore.setState({ tasks: [], isLoading: false, error: null })

    let now = 1000
    jest.spyOn(global.Date, 'now').mockImplementation(() => now++)

    render(<TasksWidget />)

    // create first blank and ensure it has focus
    await user.click(screen.getByRole('button', { name: /create task/i }))
    await waitFor(() => {
      const all = screen.getAllByRole('textbox')
      expect(all).toHaveLength(1)
      expect(all[0]).toHaveFocus()
    })

    // type title + enter and wait for the second empty input to appear and gain focus
    await user.type(screen.getAllByRole('textbox')[0], 'Hello{enter}')
    await waitFor(() => {
      const all = screen.getAllByRole('textbox')
      expect(all).toHaveLength(2)
      expect(all[1]).toHaveFocus()
    })

    // hitting enter on the empty task should keep focus there
    await user.type(screen.getAllByRole('textbox')[1], '{enter}')
    await waitFor(() => {
      const all = screen.getAllByRole('textbox')
      expect(all[1]).toHaveFocus()
    })

    // click the first task to switch focus back
    await user.click(screen.getAllByRole('textbox')[0])
    await waitFor(() => expect(screen.getAllByRole('textbox')[0]).toHaveFocus())

    // submit the first task again and verify focus returns to second
    await user.type(screen.getAllByRole('textbox')[0], '{enter}')
    await waitFor(() => expect(screen.getAllByRole('textbox')[1]).toHaveFocus())
  })

  it('blank task keeps focus and cursor after submitting again', async () => {
    const user = userEvent.setup()
    jest.spyOn(global.Date, 'now').mockImplementation(() => 5555)

    render(<TasksWidget />)

    // add initial blank
    await user.click(screen.getByRole('button', { name: /create task/i }))
    const inputs = await screen.findAllByRole('textbox')
    expect(inputs[0]).toHaveFocus()

    // submit while empty -> should remain focused and editable
    await user.type(inputs[0], '{enter}')
    expect(inputs[0]).toHaveFocus()

    // type some text afterwards
    await user.type(inputs[0], 'fillme')
    expect(inputs[0]).toHaveValue('fillme')
  })
})
