import { fireEvent, render, screen } from '@testing-library/react'
import { Input } from './Input'
import { useAddTask } from '../hooks/useTasks'

jest.mock('../hooks/useTasks', () => ({ useAddTask: jest.fn() }))

const placeholderInitialText = 'My new Todoy is...'
const inputNewValue = 'New task value'

describe('Input component', () => {
  beforeEach(() => {
    render(<Input />)
  })

  // on submit preventDefault is called
  // with empty inputValue addTask is not called

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
    const mockAddTask = jest.fn()
    ;(useAddTask as jest.Mock).mockReturnValue(mockAddTask)

    const input = screen.getByPlaceholderText(placeholderInitialText)
    const form = input.closest('form')

    fireEvent.change(input, { target: { value: inputNewValue } })
    fireEvent.submit(form!)

    expect(mockAddTask).toHaveBeenCalledWith(inputNewValue)
    expect(input).toHaveValue('')
  })

  it.only('doesn`t call addTask when input is empty', () => {
    const mockAddTask = jest.fn()
    ;(useAddTask as jest.Mock).mockReturnValue(mockAddTask)
  })
  it('prevents default form submission behavior', () => {})

  it('', () => {})
  it('', () => {})
  it('', () => {})
})
