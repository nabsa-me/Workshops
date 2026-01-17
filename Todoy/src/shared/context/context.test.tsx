import React, { useContext } from 'react'
import { render } from '@testing-library/react'
import { AppContext, AppProvider } from './appContext'

jest.mock('../hooks/useCountDown', () => ({
  useCountDown: jest.fn()
}))

import { useCountDown } from '../hooks/useCountDown'

describe('AppContext', () => {
  it('provides default context values without AppProvider', () => {
    const TestComponent = () => {
      const context = useContext(AppContext)
      return (
        <div>
          <span>{context.doneEffect}</span>
        </div>
      )
    }

    const { getByText } = render(<TestComponent />)
    expect(getByText('0')).toBeInTheDocument()
  })

  it('AppProvider provides values from useCountDown', () => {
    const mockSetDoneEffect = jest.fn()

    ;(useCountDown as jest.Mock).mockReturnValue({
      doneEffect: 5,
      setDoneEffect: mockSetDoneEffect
    })

    const TestComponent = () => {
      const { doneEffect, setDoneEffect } = useContext(AppContext)
      return (
        <div>
          <span>{doneEffect}</span>
          <button onClick={() => setDoneEffect(10)}>Set</button>
        </div>
      )
    }

    const { getByText } = render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    )

    expect(getByText('5')).toBeInTheDocument()

    getByText('Set').click()
    expect(mockSetDoneEffect).toHaveBeenCalledWith(10)
  })

  it('AppProvider renders correctly with null children', () => {
    ;(useCountDown as jest.Mock).mockReturnValue({
      doneEffect: 0,
      setDoneEffect: jest.fn()
    })

    render(<AppProvider>{null}</AppProvider>)
  })

  it('AppProvider renders correctly with undefined children', () => {
    ;(useCountDown as jest.Mock).mockReturnValue({
      doneEffect: 0,
      setDoneEffect: jest.fn()
    })

    render(<AppProvider>{undefined}</AppProvider>)
  })

  it('default setDoneEffect function can be called without errors', () => {
    const TestComponent = () => {
      const { setDoneEffect } = useContext(AppContext)
      // Llamamos la función por defecto
      setDoneEffect(123)
      return <div>Test</div>
    }

    const { getByText } = render(<TestComponent />)
    expect(getByText('Test')).toBeInTheDocument()
  })
})
