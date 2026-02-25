import { fireEvent, render, screen } from '@testing-library/react'
import Homepage from './Homepage'
import { TasksWidget } from './TasksWidget'
import userEvent from '@testing-library/user-event'

describe('Homepage', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('renders layout structure', () => {
    render(<Homepage />)

    expect(screen.getByRole('main')).toHaveClass('homePage-wrapper')
    expect(screen.getByText('tasks completed')).toBeInTheDocument()
    expect(screen.getByText('My tasks')).toBeInTheDocument()
    expect(document.querySelector('.task-widget-topBar')).toBeInTheDocument()
  })

  it('renders greeting for morning', async () => {
    jest.setSystemTime(new Date('2024-01-15T09:00:00'))

    render(<Homepage />)

    expect(
      screen.getByRole('heading', {
        name: /Good morning, extranger/i
      })
    ).toBeInTheDocument()
  })

  it('renders greeting for noon', () => {
    jest.setSystemTime(new Date('2024-01-01T12:00:00'))

    render(<Homepage />)

    expect(screen.getByRole('heading', { name: /Good noon, extranger/i })).toBeInTheDocument()
  })

  it('renders greeting for afternoon', () => {
    jest.setSystemTime(new Date('2024-01-01T13:00:00'))

    render(<Homepage />)

    expect(screen.getByRole('heading', { name: /Good afternoon, extranger/i })).toBeInTheDocument()
  })

  it('renders greeting for evening', () => {
    jest.setSystemTime(new Date('2024-01-01T19:00:00'))

    render(<Homepage />)

    expect(screen.getByRole('heading', { name: /Good evening, extranger/i })).toBeInTheDocument()
  })

  it('renders greeting for night', () => {
    jest.setSystemTime(new Date('2024-01-01T22:00:00'))

    render(<Homepage />)

    expect(screen.getByRole('heading', { name: /Good night, extranger/i })).toBeInTheDocument()
  })
})

describe('TasksWidget', () => {
  beforeEach(() => {
    jest.spyOn(global.Date, 'now').mockImplementation(() => 123456789)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders top bar, avatar, title, and tabs', () => {
    render(<TasksWidget />)

    expect(screen.getByText('My tasks')).toBeInTheDocument()
    expect(screen.getByText('NA')).toBeInTheDocument()
    expect(screen.getByText('Active')).toBeInTheDocument()
    expect(screen.getByText('Completed')).toBeInTheDocument()
    expect(screen.getByText('Deleted')).toBeInTheDocument()
  })

  it('renders Active tasks by default', () => {
    render(<TasksWidget />)
    expect(document.querySelector('.task-button')).not.toHaveClass('completed')
    expect(document.querySelector('.task-button')).not.toHaveClass('inactive')
  })

  it('renders Completed tasks when tab is clicked', () => {
    render(<TasksWidget />)
    fireEvent.click(screen.getByText('Completed'))

    expect(document.querySelector('.homePage-taskItem-task')).toHaveClass('inactive')
    expect(document.querySelector('.task-button')).toHaveClass('completed')
  })

  it('renders Deleted tasks when tab is clicked', () => {
    render(<TasksWidget />)
    fireEvent.click(screen.getByText('Deleted'))

    expect(document.querySelector('.homePage-taskItem-task')).toHaveClass('inactive')
  })

  it('creates new task and focuses it in Active tab', async () => {
    const user = userEvent.setup()
    render(<TasksWidget />)

    const createButton = screen.getByRole('button', { name: /Create task/i })
    await user.click(createButton)

    const textElements = screen.queryAllByRole('textbox')
    expect(textElements[0]).toHaveValue('')
    expect(textElements[0]).toHaveFocus()

    const taskElements = screen.queryAllByRole('listitem')
    expect(taskElements[0]).toHaveClass('selected')
  })

  it('resets focusedTaskId on task blur', async () => {
    const user = userEvent.setup()
    render(<TasksWidget />)

    await user.click(screen.getByRole('button', { name: /create task/i }))

    const input = screen.getAllByRole('textbox')[0]
    expect(input).toHaveFocus()

    await user.click(document.body)

    expect(input).not.toHaveFocus()
  })

  it('resets focusedTaskId when switching tabs', async () => {
    const user = userEvent.setup()
    render(<TasksWidget />)

    await user.click(screen.getByRole('button', { name: /create task/i }))

    let taskElements = screen.getAllByRole('textbox')
    expect(taskElements[0]).toHaveFocus()

    fireEvent.click(screen.getByText('Completed'))

    taskElements = screen.getAllByRole('textbox')
    taskElements.forEach((task) => expect(task).not.toHaveFocus())
  })
})
