import { render, screen, fireEvent } from '@testing-library/react'
import { Header } from './Header'

describe('Header component', () => {
  it('Render with proper title and icon', () => {
    render(<Header theme='dark' setTheme={jest.fn()} />)

    const title = screen.getByText('Todoy')
    const icon = screen.getByText('☀️')

    expect(title).toBeInTheDocument()
    expect(icon).toBeInTheDocument()
  })

  it('Toggles to light theme on click', () => {
    const mockSetTheme = jest.fn()
    render(<Header theme='dark' setTheme={mockSetTheme} />)

    const icon = screen.getByText('☀️')

    fireEvent.click(icon)
    expect(mockSetTheme).toHaveBeenCalledWith('light')
  })

  it('Toggles to dark theme on click', () => {
    const mockSetTheme = jest.fn()
    render(<Header theme='light' setTheme={mockSetTheme} />)

    const icon = screen.getByText('☀️')

    fireEvent.click(icon)
    expect(mockSetTheme).toHaveBeenCalledWith('dark')
  })
})
