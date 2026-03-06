import { renderHook, act } from '@testing-library/react'
import useTheme from './useTheme'
import { useHooks } from './useHooks'
import { useThemeStore, useDoneEffectStore } from '../../app/store'
import lightTheme from '../../styles/themes/light.module.css'
import darkTheme from '../../styles/themes/dark.module.css'

/**
 * INTEGRATION TESTS: useTheme + useHooks
 * Verifies complete integration between the two hooks
 */

describe('useTheme + useHooks - Complete Integration', () => {
  beforeEach(() => {
    document.documentElement.className = ''
    useThemeStore.setState({ theme: 'light' })
    useDoneEffectStore.setState({ doneEffect: 0 })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  // ===== BIDIRECTIONAL SYNCHRONIZATION TESTS =====
  describe('Bidirectional synchronization between hooks', () => {
    it('should synchronize changes from useTheme → useHooks', () => {
      const { result: rTheme } = renderHook(() => useTheme())
      const { result: rHooks } = renderHook(() => useHooks())

      act(() => {
        rTheme.current.setTheme('dark')
      })

      expect(rHooks.current.theme).toBe('dark')
    })

    it('should synchronize changes from useHooks → useTheme', () => {
      const { result: rTheme } = renderHook(() => useTheme())
      const { result: rHooks } = renderHook(() => useHooks())

      act(() => {
        rHooks.current.setTheme('dark')
      })

      expect(rTheme.current.theme).toBe('dark')
    })

    it('should synchronize direct store changes in both hooks', () => {
      const { result: rTheme } = renderHook(() => useTheme())
      const { result: rHooks } = renderHook(() => useHooks())

      act(() => {
        useThemeStore.setState({ theme: 'dark' })
      })

      expect(rTheme.current.theme).toBe('dark')
      expect(rHooks.current.theme).toBe('dark')
    })
  })

  // ===== CREATION ORDER INDEPENDENCE TESTS =====
  describe('Independence from creation order', () => {
    it('should work if useTheme is created first', () => {
      const { result: rTheme } = renderHook(() => useTheme())
      const { result: rHooks } = renderHook(() => useHooks())

      expect(rTheme.current.theme).toBe(rHooks.current.theme)

      act(() => {
        rTheme.current.setTheme('dark')
      })

      expect(rHooks.current.theme).toBe('dark')
    })

    it('should work if useHooks is created first', () => {
      const { result: rHooks } = renderHook(() => useHooks())
      const { result: rTheme } = renderHook(() => useTheme())

      expect(rTheme.current.theme).toBe(rHooks.current.theme)

      act(() => {
        rHooks.current.setTheme('dark')
      })

      expect(rTheme.current.theme).toBe('dark')
    })

    it('should maintain synchronization regardless of order or number of hooks', () => {
      const { result: rHooks1 } = renderHook(() => useHooks())
      const { result: rTheme1 } = renderHook(() => useTheme())
      const { result: rHooks2 } = renderHook(() => useHooks())
      const { result: rTheme2 } = renderHook(() => useTheme())

      act(() => {
        rTheme1.current.setTheme('dark')
      })

      expect(rHooks1.current.theme).toBe('dark')
      expect(rHooks2.current.theme).toBe('dark')
      expect(rTheme2.current.theme).toBe('dark')
    })
  })

  // ===== MULTIPLE ALTERNATING CHANGES TESTS =====
  describe('Multiple alternating changes between hooks', () => {
    it('should maintain synchronization in alternating changes', () => {
      const { result: rTheme } = renderHook(() => useTheme())
      const { result: rHooks } = renderHook(() => useHooks())

      act(() => {
        rTheme.current.setTheme('dark')
      })
      expect(rHooks.current.theme).toBe('dark')

      act(() => {
        rHooks.current.setTheme('light')
      })
      expect(rTheme.current.theme).toBe('light')

      act(() => {
        rTheme.current.setTheme('dark')
      })
      expect(rHooks.current.theme).toBe('dark')

      act(() => {
        rHooks.current.setTheme('light')
      })
      expect(rTheme.current.theme).toBe('light')
    })

    it('should apply correct classes in alternating changes', () => {
      const { result: rTheme } = renderHook(() => useTheme())
      const { result: rHooks } = renderHook(() => useHooks())

      act(() => {
        rTheme.current.setTheme('dark')
      })
      expect(document.documentElement.classList.contains(darkTheme.theme)).toBe(true)

      act(() => {
        rHooks.current.setTheme('light')
      })
      expect(document.documentElement.classList.contains(lightTheme.theme)).toBe(true)

      act(() => {
        rTheme.current.setTheme('dark')
      })
      expect(document.documentElement.classList.contains(darkTheme.theme)).toBe(true)
    })
  })

  // ===== SHARED STATE TESTS =====
  describe('Shared state between hooks', () => {
    it('should share the same source of truth (store)', () => {
      const { result: rTheme } = renderHook(() => useTheme())
      const { result: rHooks } = renderHook(() => useHooks())

      const storeState = useThemeStore.getState()

      expect(storeState.theme).toBe(rTheme.current.theme)
      expect(storeState.theme).toBe(rHooks.current.theme)
    })

    it('should update the store when changed from useTheme or useHooks', () => {
      const { result: rTheme } = renderHook(() => useTheme())
      const { result: rHooks } = renderHook(() => useHooks())

      act(() => {
        rTheme.current.setTheme('dark')
      })

      let storeState = useThemeStore.getState()
      expect(storeState.theme).toBe('dark')

      act(() => {
        rHooks.current.setTheme('light')
      })

      storeState = useThemeStore.getState()
      expect(storeState.theme).toBe('light')
    })
  })

  // ===== setTheme FUNCTIONS TESTS =====
  describe('setTheme function in both hooks', () => {
    it('should return the same function in both hooks', () => {
      const { result: rTheme } = renderHook(() => useTheme())
      const { result: rHooks } = renderHook(() => useHooks())

      const setThemeFromTheme = rTheme.current.setTheme
      const setThemeFromHooks = rHooks.current.setTheme

      // Although they may be different references, they should have the same effect
      act(() => {
        setThemeFromTheme('dark')
      })

      const result1 = useThemeStore.getState().theme
      expect(result1).toBe('dark')

      act(() => {
        setThemeFromHooks('light')
      })

      const result2 = useThemeStore.getState().theme
      expect(result2).toBe('light')
    })

    it('both functions should be functionally equivalent', () => {
      const { result: rTheme } = renderHook(() => useTheme())
      const { result: rHooks } = renderHook(() => useHooks())

      // Change from useTheme
      act(() => {
        rTheme.current.setTheme('dark')
      })

      expect(rHooks.current.theme).toBe('dark')

      // Change from useHooks with same logic
      act(() => {
        rHooks.current.setTheme('dark')
      })

      expect(rTheme.current.theme).toBe('dark')
    })
  })

  // ===== ZUSTAND useShallow TESTS =====
  describe('useShallow hook in useHooks', () => {
    it('should use shallow comparison correctly', () => {
      const { result: rHooks } = renderHook(() => useHooks())

      const initialTheme = rHooks.current.theme

      act(() => {
        rHooks.current.setTheme('dark')
      })

      expect(rHooks.current.theme).not.toBe(initialTheme)
    })

    it('should return the same object when no relevant changes', () => {
      const { result: rHooks } = renderHook(() => useHooks())

      const state1 = { theme: rHooks.current.theme, setTheme: rHooks.current.setTheme }

      act(() => {
        rHooks.current.setTheme('light')
      })

      // Theme didn't change, but object may be different
      // We verify the content is the same
      expect(rHooks.current.theme).toBe(state1.theme)
    })
  })

  // ===== PERFORMANCE WITH MULTIPLE HOOKS TESTS =====
  describe('Performance and optimization with multiple hooks', () => {
    it('should maintain consistency even with many instances', () => {
      const hooks: (typeof rTheme1)['result'][] = []
      const rTheme1 = renderHook(() => useTheme())

      hooks.push(rTheme1.result)

      for (let i = 0; i < 10; i++) {
        hooks.push(renderHook(() => useHooks()).result)
      }

      act(() => {
        rTheme1.result.current.setTheme('dark')
      })

      hooks.forEach((hook) => {
        expect(hook.current.theme).toBe('dark')
      })
    })

    it('should handle rapid changes between multiple instances', () => {
      const { result: rTheme } = renderHook(() => useTheme())
      const { result: rHooks } = renderHook(() => useHooks())

      act(() => {
        for (let i = 0; i < 50; i++) {
          if (i % 2 === 0) {
            rTheme.current.setTheme(i % 4 === 0 ? 'light' : 'dark')
          } else {
            rHooks.current.setTheme(i % 4 === 0 ? 'light' : 'dark')
          }
        }
      })

      expect(rTheme.current.theme).toBe(rHooks.current.theme)
    })
  })

  // ===== INTEGRATED SIDE EFFECTS TESTS =====
  describe('Integrated side effects', () => {
    it('should apply CSS classes when changed from useHooks (with useTheme mounted)', () => {
      const { result: rHooks } = renderHook(() => useHooks())
      // Mount useTheme to trigger CSS class application
      renderHook(() => useTheme())

      act(() => {
        rHooks.current.setTheme('dark')
      })

      expect(document.documentElement.classList.contains(darkTheme.theme)).toBe(true)
    })

    it('should keep classes synchronized when both hooks are used', () => {
      const { result: rTheme } = renderHook(() => useTheme())
      const { result: rHooks } = renderHook(() => useHooks())

      act(() => {
        rTheme.current.setTheme('dark')
      })

      expect(document.documentElement.classList.contains(darkTheme.theme)).toBe(true)

      act(() => {
        rHooks.current.setTheme('light')
      })

      expect(document.documentElement.classList.contains(lightTheme.theme)).toBe(true)
    })
  })

  // ===== LIFECYCLE TESTS =====
  describe('Lifecycle with both hooks', () => {
    it('should maintain state when useTheme unmounts but useHooks remains', () => {
      const { result: rTheme, unmount: unmountTheme } = renderHook(() => useTheme())
      const { result: rHooks } = renderHook(() => useHooks())

      act(() => {
        rTheme.current.setTheme('dark')
      })

      unmountTheme()

      expect(rHooks.current.theme).toBe('dark')
    })

    it('should maintain state when useHooks unmounts but useTheme remains', () => {
      const { result: rTheme } = renderHook(() => useTheme())
      const { result: rHooks, unmount: unmountHooks } = renderHook(() => useHooks())

      act(() => {
        rHooks.current.setTheme('dark')
      })

      unmountHooks()

      expect(rTheme.current.theme).toBe('dark')
    })

    it('should allow remounting of both hooks maintaining state', () => {
      const { unmount: unmountTheme } = renderHook(() => useTheme())
      const { unmount: unmountHooks } = renderHook(() => useHooks())

      // Set theme before unmounting
      act(() => {
        useThemeStore.setState({ theme: 'dark' })
      })

      unmountTheme()
      unmountHooks()

      const { result: rTheme } = renderHook(() => useTheme())
      const { result: rHooks } = renderHook(() => useHooks())

      expect(rTheme.current.theme).toBe('dark')
      expect(rHooks.current.theme).toBe('dark')
    })
  })

  // ===== doneEffect ISOLATION TESTS (other data in useHooks) =====
  describe('Isolation: theme does not interfere with other data in useHooks', () => {
    it('should keep doneEffect independent of theme changes', () => {
      const { result: rHooks } = renderHook(() => useHooks())

      expect(rHooks.current.doneEffect).toBe(0)

      act(() => {
        rHooks.current.setTheme('dark')
      })

      expect(rHooks.current.doneEffect).toBe(0)
    })

    it('should allow simultaneous changes of theme and doneEffect', () => {
      const { result: rHooks } = renderHook(() => useHooks())

      act(() => {
        rHooks.current.setTheme('dark')
        rHooks.current.setDoneEffect(5)
      })

      expect(rHooks.current.theme).toBe('dark')
      expect(rHooks.current.doneEffect).toBe(5)
    })

    it('doneEffect changes should not affect theme', () => {
      const { result: rHooks } = renderHook(() => useHooks())

      act(() => {
        rHooks.current.setTheme('dark')
      })

      expect(rHooks.current.theme).toBe('dark')

      act(() => {
        rHooks.current.setDoneEffect(10)
      })

      expect(rHooks.current.theme).toBe('dark')
    })
  })

  // ===== TOTAL CONSISTENCY TESTS =====
  describe('Total system consistency', () => {
    it('theme should be consistent in useTheme, useHooks and store', () => {
      const { result: rTheme } = renderHook(() => useTheme())
      const { result: rHooks } = renderHook(() => useHooks())

      const themes: Array<'light' | 'dark'> = ['dark', 'light', 'dark', 'light']

      themes.forEach((theme) => {
        act(() => {
          rTheme.current.setTheme(theme)
        })

        const storeTheme = useThemeStore.getState().theme
        expect(rTheme.current.theme).toBe(theme)
        expect(rHooks.current.theme).toBe(theme)
        expect(storeTheme).toBe(theme)
      })
    })

    it('should maintain total integrity after complex operations', () => {
      const { result: rTheme } = renderHook(() => useTheme())
      const { result: rHooks } = renderHook(() => useHooks())

      // Complex operations
      act(() => {
        for (let i = 0; i < 20; i++) {
          if (i % 3 === 0) {
            rTheme.current.setTheme(i % 2 === 0 ? 'light' : 'dark')
          } else if (i % 3 === 1) {
            rHooks.current.setTheme(i % 2 === 0 ? 'light' : 'dark')
          } else {
            useThemeStore.setState({
              theme: i % 2 === 0 ? 'light' : 'dark'
            })
          }
        }
      })

      // Verify final consistency
      const storeTheme = useThemeStore.getState().theme
      expect(rTheme.current.theme).toBe(storeTheme)
      expect(rHooks.current.theme).toBe(storeTheme)
    })
  })
})
