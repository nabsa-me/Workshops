import { renderHook, act } from '@testing-library/react'
import { useDoneEffect } from './useDoneEffect'

describe('useDoneEffect', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('initializes doneEffect between 0 and 20 by default', () => {
    const { result } = renderHook(() => useDoneEffect())
    expect(result.current.doneEffect).toBeGreaterThanOrEqual(0)
    expect(result.current.doneEffect).toBeLessThanOrEqual(20)
    expect(typeof result.current.setDoneEffect).toBe('function')
  })

  it('does not call setDoneEffect if doneEffect >= 0', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5)
    const { result } = renderHook(() => useDoneEffect())

    expect(result.current.doneEffect).toBe(10)
  })

  it('allows manually updating doneEffect via setDoneEffect', () => {
    const { result } = renderHook(() => useDoneEffect())

    act(() => {
      result.current.setDoneEffect(15)
    })

    expect(result.current.doneEffect).toBe(15)
  })

  it('calls setDoneEffect if doneEffect < 0', () => {
    const { result } = renderHook(() => useDoneEffect())

    act(() => result.current.setDoneEffect(-1))

    expect(result.current.doneEffect).toBeGreaterThanOrEqual(0)
    expect(result.current.doneEffect).toBeLessThanOrEqual(20)
  })
})
