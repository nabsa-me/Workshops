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
    const { result } = renderHook(() => useDoneEffect())

    const spy = jest.spyOn(result.current, 'setDoneEffect')
    expect(spy).not.toHaveBeenCalled()
    expect(result.current.doneEffect).toBeGreaterThanOrEqual(0)
    expect(result.current.doneEffect).toBeLessThanOrEqual(20)
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

  // new integration test verifying related hooks share state
  it('useHooks and useDoneEffect reflect the same doneEffect value', () => {
    const { result: rHooks } = renderHook(() => require('./useHooks').useHooks())
    const { result: rDone } = renderHook(() => useDoneEffect())

    // initial values should agree
    expect(rHooks.current.doneEffect).toBe(rDone.current.doneEffect)

    act(() => {
      rHooks.current.setDoneEffect(12)
    })

    expect(rHooks.current.doneEffect).toBe(12)
    expect(rDone.current.doneEffect).toBe(12)
  })
})
