import { render, screen, fireEvent, within } from '@testing-library/react'
import { Main } from './Main'
import { inputNewValue, tasksArray, placeholderInitialText } from '../../../test/constants'
import { useTasksStore } from '../../state/store'

let input: HTMLInputElement

describe('Main component', () => {
  beforeEach(() => {
    useTasksStore.setState({ tasks: [] })
    render(<Main />)
    input = screen.getByPlaceholderText(placeholderInitialText)
  })

  it('render component and its children', () => {
    const tasklistElement = screen.getByRole('main')
    expect(tasklistElement).toBeInTheDocument()

    expect(input).toBeInTheDocument

    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument

    const buttonsBox = document.getElementsByClassName('buttons-box')
    expect(buttonsBox).toBeInTheDocument
  })

  it('allows adding a new task through Input and displays it in TaskList', async () => {
    fireEvent.change(input, { target: { value: inputNewValue } })
    fireEvent.submit(input.closest('form')!)

    expect(input).toHaveValue('')

    const newTask = screen.getAllByRole('listitem')
    expect(newTask.length).toBe(1)

    const newTaskValue = within(newTask[0]).getByDisplayValue(inputNewValue)
    expect(newTaskValue).toBeInTheDocument()
  })

  it('adds many new task and displays them in the wright in TaskList', async () => {
    tasksArray.forEach((taskObject) => {
      fireEvent.change(input, { target: { value: taskObject.text } })
      fireEvent.submit(input.closest('form')!)

      expect(input).toHaveValue('')
      expect(screen.getByDisplayValue(taskObject.text)).toBeInTheDocument()
    })

    const newTaskList = screen.getAllByRole('listitem')
    expect(newTaskList.length).toBe(tasksArray.length)
  })
})
