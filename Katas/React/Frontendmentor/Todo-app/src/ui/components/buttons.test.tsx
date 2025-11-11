import { fireEvent, render, screen } from '@testing-library/react'
import { DeleteButton, TaskButton } from './buttons'
import React from 'react'

describe('TaskButton component', () => {
  it('renders the button with initial state "pendant"', () => {
    render(<TaskButton />)

    const button = screen.getByRole('button')
    const background = button.querySelector('.button-background')
    const checkIcon = button.querySelector('.check-icon')

    expect(button).toBeInTheDocument()
    expect(background).toHaveClass('pendant')
    expect(checkIcon).toBeInTheDocument()
  })

  it('renders in "done" state if initial prop is done', () => {
    jest.spyOn(React, 'useState').mockImplementationOnce(() => ['done', jest.fn()])
    render(<TaskButton />)

    const background = screen.getByRole('button').querySelector('.button-background')
    expect(background).toHaveClass('done')
    jest.restoreAllMocks()
  })

  it('toggles class to "done" when clicked and back to "pendant"', () => {
    render(<TaskButton />)

    const button = screen.getByRole('button')
    const background = button.querySelector('.button-background')

    fireEvent.click(button)
    expect(background).toHaveClass('done')

    fireEvent.click(button)
    expect(background).toHaveClass('pendant')
  })

  it('doesn`t render background if state is undefined or null', () => {
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [undefined, jest.fn()])
    render(<TaskButton />)

    const button = screen.getByRole('button')
    const background = button.querySelector('.button-background')

    expect(background).not.toBeInTheDocument()
    jest.restoreAllMocks()
  })
})

describe('DeleteButton component', () => {
  it('renders the button with initial state "current"', () => {
    render(<DeleteButton />)

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('toggles class to "deleted" when clicked and back to "current"', () => {
    render(<DeleteButton />)

    const button = screen.getByRole('button')
    expect(button).toHaveClass('current')

    fireEvent.click(button)
    expect(button).toHaveClass('deleted')

    fireEvent.click(button)
    expect(button).toHaveClass('current')
  })

  it('renders in "deleted" state if initial prop is deleted', () => {
    jest.spyOn(React, 'useState').mockImplementationOnce(() => ['deleted', jest.fn()])
    render(<DeleteButton />)

    const button = screen.getByRole('button')
    expect(button).toHaveClass('deleted')
    jest.restoreAllMocks()
  })

  it('doesn`t render if state is undefined or null', () => {
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [undefined, jest.fn()])
    render(<DeleteButton />)

    const button = screen.queryByRole('button')
    expect(button).not.toBeInTheDocument()
    jest.restoreAllMocks()
  })
})
