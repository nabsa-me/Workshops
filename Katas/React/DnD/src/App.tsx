import React, { JSX, useEffect, useState } from 'react'
import lightTheme from './styles/themes/light.module.css'
import darkTheme from './styles/themes/dark.module.css'
import { useMediaQuery } from './ui/hooks/useMediaQuery'

const App = (): JSX.Element => {
  const [theme] = useState<'light' | 'dark'>('dark')
  const { windowSize, isMobile } = useMediaQuery()

  useEffect(() => {
    const root = document.documentElement

    root.classList.remove(lightTheme.theme, darkTheme.theme)
    root.classList.add(theme === 'dark' ? darkTheme.theme : lightTheme.theme)
  }, [theme])

  return (
    <div className='wrapper' data-testid={`${theme}-theme`}>
      <div className='background'>
        <div className='background-image'></div>
      </div>

      <div className='app-wrapper'>
        {isMobile ? (
          <header className='header' data-testid='mobile-header'>
            MOBILE HEADER
          </header>
        ) : (
          <header className='header' data-testid='desktop-header'>
            DESKTOP HEADER
          </header>
        )}

        <main className='main'>
          <div className={`banner-wrapper ${windowSize.orientation}`}>
            <div>
              <h1>TITLE</h1>
              <h2>Subtitle</h2>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
            <button className='CTA'>button</button>
          </div>
        </main>

        <footer className='footer'>Footer copyright</footer>
      </div>
    </div>
  )
}

export default App
