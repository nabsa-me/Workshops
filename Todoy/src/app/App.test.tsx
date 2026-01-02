import { render } from '@testing-library/react'
import App from './App'
import useTheme from '../shared/hooks/useTheme'

jest.mock('../shared/hooks/useTheme', () => ({
  __esModule: true,
  default: jest.fn()
}))

describe('App', () => {
  it('calls useTheme on render', () => {
    render(<App />)

    expect(useTheme).toHaveBeenCalledTimes(1)
  })
})

describe('App component', () => {
  it('show welcome message', () => {
    render(<App />)

    const desktopLayout = document.getElementsByClassName('appRoot')[0]
    expect(desktopLayout).toBeInTheDocument()
  })
})
