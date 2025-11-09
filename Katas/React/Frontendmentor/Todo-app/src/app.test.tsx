import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

describe('App component', () => {
  it('Render components', () => {
    render(<App />)

    const headerElement = screen.getByRole('banner')
    const tasklistElement = screen.getByRole('main')
    const footerElement = screen.getByRole('contentinfo')

    expect(headerElement).toBeInTheDocument()
    expect(tasklistElement).toBeInTheDocument()
    expect(footerElement).toBeInTheDocument()
  })
})

describe('App theme toggling', () => {
  beforeEach(() => render(<App />))

  it('should be dark theme by default', () => {
    const appInDark = document.querySelector('div#dark.wrapper')
    expect(appInDark).toBeInTheDocument()
  })

  it('should toggle to light theme after click and back to dark', () => {
    const toggleButton = screen.getByText('☀️')

    fireEvent.click(toggleButton)
    expect(document.querySelector('div#light.wrapper')).toBeInTheDocument()

    fireEvent.click(toggleButton)
    expect(document.querySelector('div#dark.wrapper')).toBeInTheDocument()
  })
})
