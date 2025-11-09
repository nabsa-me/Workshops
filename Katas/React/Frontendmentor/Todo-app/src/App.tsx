import { JSX, useEffect, useState } from 'react'
import lightTheme from './styles/themes/light.module.css'
import darkTheme from './styles/themes/dark.module.css'
import { Header } from './ui/components/Header'
import { Main } from './ui/components/Main'
import { Footer } from './ui/components/Footer'

const App = (): JSX.Element => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    const root = document.documentElement

    root.classList.remove(lightTheme.theme, darkTheme.theme)
    root.classList.add(theme === 'dark' ? darkTheme.theme : lightTheme.theme)
  }, [theme])

  return (
    <div className='wrapper' id={theme}>
      <div className='background'>
        <div className={`hero-banner ${theme}`}></div>
      </div>
      <div className='app-wrapper'>
        <Header theme={theme} setTheme={setTheme} />
        <Main />
        <Footer />
      </div>
    </div>
  )
}

export default App
