import { renderHook, act } from '@testing-library/react'
import useTheme from './useTheme'
import { useHooks } from './useHooks'
import { useThemeStore } from '../../app/store'
import lightTheme from '../../styles/themes/light.module.css'
import darkTheme from '../../styles/themes/dark.module.css'

describe('useTheme', () => {
  beforeEach(() => {
    document.documentElement.className = ''
    useThemeStore.setState({ theme: 'light' })
  })

  it('should initialize with light theme and apply it to document root', () => {
    const { result } = renderHook(() => useTheme())

    expect(result.current.theme).toBe('light')
    expect(document.documentElement.classList.contains(lightTheme.theme)).toBe(true)
  })

  it('should switch to dark theme and update document root classes', () => {
    const { result } = renderHook(() => useTheme())

    act(() => {
      result.current.setTheme('dark')
    })

    expect(result.current.theme).toBe('dark')
    expect(document.documentElement.classList.contains(darkTheme.theme)).toBe(true)
  })

  it('should switch to dark theme and back to light theme on double click', () => {
    const { result } = renderHook(() => useTheme())

    expect(result.current.theme).toBe('light')
    expect(document.documentElement.classList.contains(lightTheme.theme)).toBe(true)

    act(() => {
      result.current.setTheme('dark')
    })
    expect(result.current.theme).toBe('dark')
    expect(document.documentElement.classList.contains(darkTheme.theme)).toBe(true)

    act(() => {
      result.current.setTheme('light')
    })
    expect(result.current.theme).toBe('light')
    expect(document.documentElement.classList.contains(lightTheme.theme)).toBe(true)
  })

  it('useHooks agrees with useTheme and updates together', () => {
    const { result: rTheme } = renderHook(() => useTheme())
    const { result: rHooks } = renderHook(() => useHooks())

    expect(rTheme.current.theme).toBe(rHooks.current.theme)

    act(() => {
      rTheme.current.setTheme('dark')
    })
    expect(rHooks.current.theme).toBe('dark')

    act(() => {
      rHooks.current.setTheme('light')
    })
    expect(rTheme.current.theme).toBe('light')
  })
})
