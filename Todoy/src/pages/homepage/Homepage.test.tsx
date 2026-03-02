import { render, screen } from '@testing-library/react'
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

    // make Date.now return increasing values so new tasks have distinct ids
    let now = 1000
    jest.spyOn(global.Date, 'now').mockImplementation(() => now++)

    render(<TasksWidget />)

    // create first blank task
    await user.click(screen.getByRole('button', { name: /create task/i }))
    let inputs = await screen.findAllByRole('textbox')
    expect(inputs[0]).toHaveFocus()

    // type a title and submit
    await user.type(inputs[0], 'Hello{enter}')

    // second (empty) task should appear and be focused
    inputs = await screen.findAllByRole('textbox')
    expect(inputs).toHaveLength(2)
    expect(inputs[1]).toHaveFocus()

    // submit again while blank – focus remains on second
    await user.type(inputs[1], '{enter}')
    expect(inputs[1]).toHaveFocus()

    // click the first task to move focus back
    await user.click(inputs[0])
    expect(inputs[0]).toHaveFocus()

    // submit first task again; the empty neighbor should regain focus
    await user.type(inputs[0], '{enter}')
    inputs = await screen.findAllByRole('textbox')
    expect(inputs[1]).toHaveFocus()
  })
})
