import lightTheme from '../../styles/themes/light.module.css'
import darkTheme from '../../styles/themes/dark.module.css'
import { useEffect, useState } from 'react'

const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const root = document.documentElement

    root.classList.remove(lightTheme.theme, darkTheme.theme)
    root.classList.add(theme === 'dark' ? darkTheme.theme : lightTheme.theme)
  }, [theme])

  return { theme, setTheme }
}

export default useTheme
