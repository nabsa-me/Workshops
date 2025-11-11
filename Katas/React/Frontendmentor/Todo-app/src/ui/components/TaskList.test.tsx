import { render, screen } from '@testing-library/react'
import { tasksArray } from '../../../test/constants'
import { TaskList } from './TaskList'
import { useGetTaskList } from '../hooks/useTasks'

jest.mock('../hooks/useTasks', () => ({ useGetTaskList: jest.fn(), useEditTask: jest.fn() }))

describe('TaskList component', () => {
  beforeEach(() => {})

  it('renders component and its children without re-renders', () => {
    ;(useGetTaskList as jest.Mock).mockReturnValue(tasksArray)
    render(<TaskList />)

    expect(useGetTaskList).toHaveBeenNthCalledWith(1)
    expect(document.getElementsByClassName('task-list-wrapper')[0]).toBeInTheDocument()
    expect(screen.getByText('Items left')).toBeInTheDocument()
    expect(screen.getByText('Clear completed')).toBeInTheDocument()

    const taskItems = document.getElementsByClassName('task')
    expect(taskItems.length).toBe(tasksArray.length)
  })

  it('renders correctly when there are no tasks', () => {
    ;(useGetTaskList as jest.Mock).mockReturnValue([])
    render(<TaskList />)

    expect(useGetTaskList).toHaveBeenNthCalledWith(1)
    expect(document.getElementsByClassName('task-list-wrapper')[0]).toBeInTheDocument()

    const taskItems = document.getElementsByClassName('task')
    expect(taskItems.length).toBe(0)
  })

  it('renders safely if useGetTaskList returns undefined or null', () => {
    ;(useGetTaskList as jest.Mock).mockReturnValue(undefined)
    render(<TaskList />)

    expect(useGetTaskList).toHaveBeenNthCalledWith(1)
    expect(document.getElementsByClassName('task-list-wrapper')[0]).toBeInTheDocument()
  })

  it('adds the "last-task" class only to the final task', () => {
    ;(useGetTaskList as jest.Mock).mockReturnValue(tasksArray)
    render(<TaskList />)

    const tasksList = document.getElementsByClassName('task')
    expect(tasksList[0]).not.toHaveClass('last-task')
    expect(tasksList[tasksList.length - 1]).toHaveClass('last-task')
  })

  it('renders each task input with the correct value', () => {
    ;(useGetTaskList as jest.Mock).mockReturnValue(tasksArray)
    render(<TaskList />)

    tasksArray.forEach((task) => {
      expect(screen.getByDisplayValue(String(task.text))).toBeInTheDocument()
    })
  })

  // it.only('handles error thrown by useGetTaskList gracefully', () => {
  //   ;(useGetTaskList as jest.Mock).mockImplementation(() => {
  //     throw new Error('Hook error')
  //   })
  //   expect(() => render(<TaskList />)).not.toThrow()
  // })
})
