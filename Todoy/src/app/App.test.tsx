import { render, screen } from '@testing-library/react'
import App from './App'
import useTheme from '../shared/hooks/useTheme'
import { useTasks } from '../shared/hooks/useTasks'

jest.mock('../shared/hooks/useTheme', () => ({
  __esModule: true,
  default: jest.fn()
}))

jest.mock('../shared/hooks/useTasks', () => ({
  __esModule: true,
  useTasks: jest.fn()
}))

describe('App', () => {
  beforeEach(() => {
    ;(useTheme as jest.Mock).mockClear().mockReturnValue({
      theme: 'light',
      setTheme: jest.fn()
    })
    ;(useTasks as jest.Mock).mockClear().mockReturnValue({
      loadTasks: jest.fn(),
      completedTasks: [],
      tasks: [],
      createTask: jest.fn(),
      updateTask: jest.fn(),
      deleteTask: jest.fn(),
      isLoading: false
    })
  })

  it('calls useTheme on render', async () => {
    render(<App />)

    await screen.findByRole('main')
    expect(useTheme).toHaveBeenCalledTimes(1)
  })
})

describe('App component', () => {
  beforeEach(() => {
    ;(useTheme as jest.Mock).mockClear().mockReturnValue({
      theme: 'light',
      setTheme: jest.fn()
    })
    ;(useTasks as jest.Mock).mockClear().mockReturnValue({
      loadTasks: jest.fn(),
      completedTasks: [],
      tasks: [],
      createTask: jest.fn(),
      updateTask: jest.fn(),
      deleteTask: jest.fn(),
      isLoading: false
    })
  })

  it('show welcome message', async () => {
    render(<App />)

    await screen.findByRole('main')
    const desktopLayout = document.getElementsByClassName('appRoot')[0]
    expect(desktopLayout).toBeInTheDocument()
  })
})
