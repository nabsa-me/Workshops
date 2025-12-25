import { render, screen } from '@testing-library/react'
import App from '../src/App'

describe('App component', () => {
  it('show welcome message', () => {
    render(<App />)

    const loadingText = screen.getByText(/Hello World/i)
    expect(loadingText).toBeInTheDocument()
  })
})
