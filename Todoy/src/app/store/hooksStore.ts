import { create } from 'zustand'

interface ThemeState {
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'light',
  setTheme: (theme) => set({ theme })
}))

interface DoneEffectState {
  doneEffect: number
  setDoneEffect: (doneEffect: number) => void
}

export const useDoneEffectStore = create<DoneEffectState>((set) => ({
  doneEffect: 0,
  setDoneEffect: (doneEffect) => set({ doneEffect })
}))
