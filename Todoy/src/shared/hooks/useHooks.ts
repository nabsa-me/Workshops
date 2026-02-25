import { useThemeStore, useDoneEffectStore } from '../../app/store'
import { useShallow } from 'zustand/react/shallow'

export const useHooks = () => {
  const { theme, setTheme } = useThemeStore(
    useShallow((state) => ({
      theme: state.theme,
      setTheme: state.setThemeSelector
    }))
  )

  const { doneEffect, setDoneEffect } = useDoneEffectStore(
    useShallow((state) => ({
      doneEffect: state.doneEffect,
      setDoneEffect: state.setDoneEffectSelector
    }))
  )

  return { theme, setTheme, doneEffect, setDoneEffect }
}
