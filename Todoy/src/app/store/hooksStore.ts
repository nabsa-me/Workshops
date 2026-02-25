import { create } from 'zustand'

export interface IThemeState {
  theme: 'light' | 'dark'
  setThemeSelector: (theme: 'light' | 'dark') => void
}

export const useThemeStore = create<IThemeState>((set) => ({
  theme: 'light',
  setThemeSelector: (theme) => set({ theme })
}))

interface DoneEffectState {
  doneEffect: number
  setDoneEffectSelector: (doneEffect: number) => void
}

export const useDoneEffectStore = create<DoneEffectState>((set) => ({
  doneEffect: 0,
  setDoneEffectSelector: (doneEffect) => set({ doneEffect })
}))
