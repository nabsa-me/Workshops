import { JSX, useEffect, useState } from 'react'
import lightTheme from './styles/themes/light.module.css'
import darkTheme from './styles/themes/dark.module.css'
import { DailyCard, DataCard, HourlyCard, MainCard } from './ui/components/cards'
import { useFetchWeather } from './ui/hooks/useFetchWeather'
import { useFetchCity } from './ui/hooks/useFetchCity'

const App = (): JSX.Element => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const coords = useFetchCity('Barcelona')
  const forecast = useFetchWeather(coords?.latitude, coords?.longitude)

  useEffect(() => {
    const root = document.documentElement

    root.classList.remove(lightTheme.theme, darkTheme.theme)
    root.classList.add(theme === 'dark' ? darkTheme.theme : lightTheme.theme)
  }, [theme])

  const dailyArray = Array.from({ length: 7 }, (_, i) => i)

  return (
    <main onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {forecast?.current ? (
        <>
          <section className='section-container'>
            <h2>Today</h2>
            <div className='daily-container'>
              <MainCard coords={coords} forecast={forecast} />
              <div className='daily-detail-container grid'>
                <DataCard />
                <DataCard />
                <DataCard />
                <DataCard />
              </div>
            </div>
          </section>

          <section className='section-container'>
            <h2>Week forecast</h2>
            <div className='weekly-container grid'>
              {dailyArray.map((_, index) => (
                <DailyCard key={index} />
              ))}
            </div>
          </section>

          <section className='section-container hourly-section'>
            <div className='hourly-menu'>
              <h2>Hourly forecast</h2>
              <button>click-me</button>
            </div>
            <div className='hourly-list'>
              {dailyArray.map((_, index) => (
                <HourlyCard key={index} />
              ))}
            </div>
          </section>
        </>
      ) : (
        <p>Cargando coordenadas...</p>
      )}
    </main>
  )
}

export default App
