import { createContext } from 'react'
import { useDoneEffect } from '../hooks/useDoneEffect'

type AppContextType = {
  doneEffect: number
  setDoneEffect: (number: number) => void
}

export const AppContext = createContext<AppContextType>({
  doneEffect: 0,
  setDoneEffect: () => {}
})

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const { doneEffect, setDoneEffect } = useDoneEffect()

  return <AppContext.Provider value={{ doneEffect, setDoneEffect }}>{children}</AppContext.Provider>
}
