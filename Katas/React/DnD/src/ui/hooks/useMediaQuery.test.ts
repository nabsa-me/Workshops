import { renderHook, act } from '@testing-library/react'
import { useMediaQuery } from './useMediaQuery'
import React from 'react'
import { mockResize } from '../../utils/test-helpers'

describe('useMediaQuery initialization', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  test('initialize with the correct width / height', () => {
    mockResize(800, 600)
    const { result } = renderHook(() => useMediaQuery())
    expect(result.current.windowSize.width).toBe(800)
    expect(result.current.windowSize.height).toBe(600)
  })

  test('initial orientation=portrait when width > height', () => {
    mockResize(900, 600)
    const { result } = renderHook(() => useMediaQuery())
    expect(result.current.windowSize.orientation).toBe('portrait')
  })

  test('initial orientation=vertical when width < height', () => {
    mockResize(600, 900)
    const { result } = renderHook(() => useMediaQuery())
    expect(result.current.windowSize.orientation).toBe('vertical')
  })

  test('isMobile is true if width < 425', () => {
    mockResize(320, 800)
    const { result } = renderHook(() => useMediaQuery())
    expect(result.current.isMobile).toBe(true)
  })

  test('isMobile is false if width >= 425', () => {
    mockResize(520, 800)
    const { result } = renderHook(() => useMediaQuery())
    expect(result.current.isMobile).toBe(false)
  })
})

describe('useMediaQuery listener correctness', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  test('add resize listener once', () => {
    const listenerSpy = jest.spyOn(window, 'addEventListener')
    renderHook(() => useMediaQuery())

    expect(listenerSpy).toHaveBeenCalledTimes(1)
    expect(listenerSpy.mock.calls[0][0]).toBe('resize')
  })

  test('removes listener on unmount', () => {
    const listenerSpy = jest.spyOn(window, 'removeEventListener')
    const { unmount } = renderHook(() => useMediaQuery())
    unmount()

    expect(listenerSpy).toHaveBeenCalledTimes(1)
    expect(listenerSpy.mock.calls[0][0]).toBe('resize')
  })

  test('listener is not duplicated after multiple rerenders', () => {
    const addListenerSpy = jest.spyOn(window, 'addEventListener')

    const { rerender } = renderHook(() => useMediaQuery())

    rerender()
    rerender()

    expect(addListenerSpy).toHaveBeenCalledTimes(1)
  })

  test('add and removeEventListener use the same callback reference', () => {
    const addListenerSpy = jest.spyOn(window, 'addEventListener')
    const removeListenerSpy = jest.spyOn(window, 'removeEventListener')

    const { unmount } = renderHook(() => useMediaQuery())

    expect(addListenerSpy).toHaveBeenCalledTimes(1)
    const addedCallback = addListenerSpy.mock.calls[0][1]

    unmount()
    expect(removeListenerSpy).toHaveBeenCalledTimes(1)
    const removedCallack = removeListenerSpy.mock.calls[0][1]

    expect(addedCallback).toBe(removedCallack)
  })

  test('does not update windowSize if new size equals current', () => {
    mockResize(1800, 600)

    const { result } = renderHook(() => useMediaQuery())
    jest.spyOn(React, 'useState')

    act(() => mockResize(1800, 600))
    expect(result.current.windowSize.width).toBe(1800)
    expect(result.current.windowSize.height).toBe(600)
  })

  test('only rerenders when windowSize changes', () => {
    mockResize(1800, 600)

    const { result } = renderHook(() => useMediaQuery())
    const firstRender = result.current.windowSize

    act(() => mockResize(800, 800))
    const secondRender = result.current.windowSize

    act(() => mockResize(800, 800))
    const thirdRender = result.current.windowSize

    expect(secondRender).not.toEqual(firstRender)
    expect(secondRender).toEqual(thirdRender)
  })
})
