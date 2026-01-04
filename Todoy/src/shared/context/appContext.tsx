import { createContext } from 'react'
import { useCountDown } from '../hooks/useCountDown'

type AppContextType = {
  doneEffect: number
  setDoneEffect: (number: number) => void
}

export const AppContext = createContext<AppContextType>({
  doneEffect: 0,
  setDoneEffect: () => {}
})

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const { doneEffect, setDoneEffect } = useCountDown()

  return <AppContext.Provider value={{ doneEffect, setDoneEffect }}>{children}</AppContext.Provider>
}
