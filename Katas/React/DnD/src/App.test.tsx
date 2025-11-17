import { act, render, screen } from '@testing-library/react'
import App from './App'
import { mockResize } from './utils/test-helpers'
import React from 'react'

describe('App component', () => {
  it('initiate with dark theme', () => {
    render(<App />)

    const appInDark = screen.getByTestId('dark-theme')
    expect(appInDark).toBeInTheDocument()
  })

  it('renders main components', () => {
    render(<App />)

    const header = screen.getByRole('banner')
    const main = screen.getByRole('main')
    const footer = screen.getByRole('contentinfo')

    expect(header).toBeInTheDocument()
    expect(main).toBeInTheDocument()
    expect(footer).toBeInTheDocument()
  })

  it('renders background properly', () => {
    render(<App />)

    const backgroundImage = document.getElementsByClassName('background-image')
    expect(backgroundImage[0]).toBeInTheDocument()
  })

  it('renders Desktop Header when width > 425px', () => {
    mockResize(1024, 800)
    render(<App />)

    expect(screen.getByTestId('desktop-header')).toBeInTheDocument()
  })

  it('renders Mobile Header when width < 425px', () => {
    mockResize(300, 800)
    render(<App />)

    expect(screen.getByTestId('mobile-header')).toBeInTheDocument()
  })

  it('updates to Desktop when resize to > 425px', () => {
    mockResize(300, 800)
    render(<App />)

    expect(screen.getByTestId('mobile-header')).toBeInTheDocument()

    act(() => {
      mockResize(1024, 800)
    })
    expect(screen.getByTestId('desktop-header')).toBeInTheDocument()
  })

  it('changes orientation when screen does', () => {
    mockResize(900, 600)
    render(<App />)

    const banner = document.getElementsByClassName('banner-wrapper')
    expect(banner[0].className).toContain('portrait')

    act(() => {
      mockResize(600, 900)
    })
    expect(banner[0].className).toContain('vertical')
  })

  it('it renders light theme when is setted', () => {
    jest.spyOn(React, 'useState').mockImplementationOnce(() => ['light', jest.fn()])
    render(<App />)

    expect(screen.getByTestId('light-theme')).toBeInTheDocument()
  })
})
