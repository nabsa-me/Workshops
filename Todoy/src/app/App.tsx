import { JSX, useEffect, useState } from 'react'
import lightTheme from './styles/themes/light.module.css'
import darkTheme from './styles/themes/dark.module.css'

const App = (): JSX.Element => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    const root = document.documentElement

    root.classList.remove(lightTheme.theme, darkTheme.theme)
    root.classList.add(theme === 'dark' ? darkTheme.theme : lightTheme.theme)
  }, [theme])

  return <div onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Hello World</div>
}

export default App
