import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import App from './App'

jest.mock('react-dom/client', () => ({
  __esModule: true,
  createRoot: jest.fn()
}))

describe('index entry point', () => {
  let container: HTMLElement
  let mockRender: jest.Mock

  beforeEach(() => {
    container = document.createElement('div')
    container.id = 'root'
    document.body.appendChild(container)

    mockRender = jest.fn()
    ;(ReactDOMClient.createRoot as jest.Mock).mockReturnValue({
      render: mockRender
    })
  })

  afterEach(() => {
    document.body.innerHTML = ''
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('renders the App into the root container', () => {
    require('./index')

    expect(ReactDOMClient.createRoot).toHaveBeenCalledWith(container)
    expect(mockRender).toHaveBeenCalledWith(<App />)
  })
})
