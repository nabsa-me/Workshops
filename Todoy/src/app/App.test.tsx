import { render, screen } from '@testing-library/react'
import App from './App'
import useTheme from '../shared/hooks/useTheme'

jest.mock('../shared/hooks/useTheme', () => ({
  __esModule: true,
  default: jest.fn()
}))

describe('App', () => {
  it('calls useTheme on render', async () => {
    render(<App />)

    await screen.findByRole('main')
    expect(useTheme).toHaveBeenCalledTimes(1)
  })
})

describe('App component', () => {
  it('show welcome message', async () => {
    render(<App />)

    await screen.findByRole('main')
    const desktopLayout = document.getElementsByClassName('appRoot')[0]
    expect(desktopLayout).toBeInTheDocument()
  })
})
