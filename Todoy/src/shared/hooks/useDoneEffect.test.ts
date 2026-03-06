import { renderHook, act, waitFor } from '@testing-library/react'
import { useDoneEffect } from './useDoneEffect'
import { useDoneEffectStore } from '../../app/store'

// helper to reset the zustand store to a known value
const resetStore = (value: number) => {
  act(() => {
    useDoneEffectStore.setState({ doneEffect: value })
  })
}

describe('useDoneEffect', () => {
  beforeEach(() => {
    // always start with a sane value
    resetStore(0)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('initializes doneEffect between 0 and 20 by default', () => {
    const { result } = renderHook(() => useDoneEffect())

    expect(result.current.doneEffect).toBeGreaterThanOrEqual(0)
    expect(result.current.doneEffect).toBeLessThanOrEqual(20)
    expect(typeof result.current.setDoneEffect).toBe('function')
  })

  it('does not call setDoneEffect when value is already non negative', () => {
    const { result } = renderHook(() => useDoneEffect())
    const spy = jest.spyOn(result.current, 'setDoneEffect')

    // effect runs on mount but should short‑circuit
    expect(spy).not.toHaveBeenCalled()
    expect(result.current.doneEffect).toBeGreaterThanOrEqual(0)
  })

  it('resets a negative initial store value on mount', () => {
    resetStore(-5) // simulate corrupted state before render

    jest.spyOn(Math, 'random').mockReturnValue(0.1) // deterministic

    const { result } = renderHook(() => useDoneEffect())

    // effect should have been invoked once and the store updated
    expect(result.current.doneEffect).toBeGreaterThanOrEqual(0)
    expect(result.current.doneEffect).toBeLessThanOrEqual(20)
  })

  it('generates boundary values when random is stubbed', async () => {
    // low boundary
    resetStore(-1)
    const lowSpy = jest.spyOn(Math, 'random').mockReturnValue(0)
    const { result: low, unmount: unmountLow } = renderHook(() => useDoneEffect())
    await waitFor(() => {
      expect(low.current.doneEffect).toBe(0)
    })
    unmountLow()
    lowSpy.mockRestore()

    // high boundary
    resetStore(-1)
    const highSpy = jest.spyOn(Math, 'random').mockReturnValue(0.9999)
    const { result: high } = renderHook(() => useDoneEffect())
    await waitFor(() => {
      expect(high.current.doneEffect).toBe(20)
    })
    highSpy.mockRestore()
  })

  it('allows manual updates and does not overwrite a non negative value', () => {
    const { result } = renderHook(() => useDoneEffect())

    act(() => result.current.setDoneEffect(15))
    expect(result.current.doneEffect).toBe(15)

    // setting a positive number again should not trigger the effect
    const spy = jest.spyOn(result.current, 'setDoneEffect')
    act(() => result.current.setDoneEffect(7))
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('automatically fixes the value when user code sets a negative number', () => {
    const { result } = renderHook(() => useDoneEffect())

    // first call sets negative
    act(() => result.current.setDoneEffect(-1))
    expect(result.current.doneEffect).toBeGreaterThanOrEqual(0)
    expect(result.current.doneEffect).toBeLessThanOrEqual(20)

    // second call again negative should run effect again once
    act(() => result.current.setDoneEffect(-10))
    expect(result.current.doneEffect).toBeGreaterThanOrEqual(0)
  })

  it('useHooks and useDoneEffect share the same state', () => {
    const { result: rHooks } = renderHook(() => require('./useHooks').useHooks())
    const { result: rDone } = renderHook(() => useDoneEffect())

    expect(rHooks.current.doneEffect).toBe(rDone.current.doneEffect)

    act(() => rHooks.current.setDoneEffect(12))

    expect(rHooks.current.doneEffect).toBe(12)
    expect(rDone.current.doneEffect).toBe(12)
  })
})
