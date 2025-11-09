import { fireEvent, render, screen } from '@testing-library/react'
import { DeleteButton, TaskButton } from './buttons'

describe('TaskButton component', () => {
  beforeEach(() => {
    render(<TaskButton />)
  })

  it('renders the button with initial state "pendant"', () => {
    const button = screen.getByRole('button')
    const background = button.querySelector('.button-background')
    const checkIcon = button.querySelector('.check-icon')

    expect(button).toBeInTheDocument()
    expect(background).toHaveClass('pendant')
    expect(checkIcon).toBeInTheDocument()
  })

  it('toggles class to "done" when clicked and back to "pendant"', () => {
    const button = screen.getByRole('button')
    const background = button.querySelector('.button-background')

    fireEvent.click(button)
    expect(background).toHaveClass('done')

    fireEvent.click(button)
    expect(background).toHaveClass('pendant')
  })
})

describe('DeleteButton component', () => {
  beforeEach(() => {
    render(<DeleteButton />)
  })

  it('renders the button with initial state "current"', () => {
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('toggles class to "deleted" when clicked and back to "current"', () => {
    const button = screen.getByRole('button')
    expect(button).toHaveClass('current')

    fireEvent.click(button)
    expect(button).toHaveClass('deleted')

    fireEvent.click(button)
    expect(button).toHaveClass('current')
  })
})
