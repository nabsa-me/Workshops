import { fireEvent, render, screen } from '@testing-library/react'
import { Input } from './Input'
import { useAddTask } from '../hooks/useTasks'
import { inputNewValue, placeholderInitialText } from '../../../test/constants'

jest.mock('../hooks/useTasks', () => ({ useAddTask: jest.fn() }))

const createMockAddTask = () => {
  const mockAddTask = jest.fn()
  ;(useAddTask as jest.Mock).mockReturnValue(mockAddTask)
  return mockAddTask
}

describe('Input component', () => {
  beforeEach(() => {
    render(<Input />)
  })

  it('renders and the initial text is shown', () => {
    const form = document.querySelector('form')
    const placeholder = screen.getByPlaceholderText(placeholderInitialText)

    expect(form).toBeInTheDocument()
    expect(placeholder).toBeInTheDocument
  })

  it('updates value when user writes', () => {
    const input = screen.getByPlaceholderText(placeholderInitialText)

    fireEvent.change(input, { target: { value: inputNewValue } })
    expect(input).toHaveValue(inputNewValue)
  })

  it('calls useAddTask on submit and clears input', () => {
    const mockAddTask = createMockAddTask()
    const input = screen.getByPlaceholderText(placeholderInitialText)
    const form = input.closest('form')

    fireEvent.change(input, { target: { value: inputNewValue } })
    fireEvent.submit(form!)

    expect(mockAddTask).toHaveBeenCalledWith(inputNewValue)
    expect(input).toHaveValue('')
  })

  it('doesn`t call addTask when input is empty', () => {
    const mockAddTask = createMockAddTask()
    const form = document.querySelector('form')!
    fireEvent.submit(form)

    expect(mockAddTask).toHaveBeenCalledTimes(0)
  })

  it('prevents default form submission behavior', () => {
    createMockAddTask()

    const preventDefault = jest.spyOn(Event.prototype, 'preventDefault')

    const form = document.querySelector('form')!
    const input = screen.getByPlaceholderText(placeholderInitialText)

    fireEvent.change(input, { target: { value: inputNewValue } })
    fireEvent.submit(form, { preventDefault })

    expect(preventDefault).toHaveBeenCalled()
  })
})
