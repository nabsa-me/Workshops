import { renderHook, act } from '@testing-library/react'
import useTheme from './useTheme'
import lightTheme from '../../styles/themes/light.module.css'
import darkTheme from '../../styles/themes/dark.module.css'

describe('useTheme', () => {
  beforeEach(() => {
    document.documentElement.className = ''
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
})
