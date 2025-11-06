import { JSX, useEffect, useState } from 'react'
import lightTheme from './styles/themes/light.module.css'
import darkTheme from './styles/themes/dark.module.css'
import { useFetchWeather } from './ui/hooks/useFetchWeather'
import { useFetchCity } from './ui/hooks/useFetchCity'
import { HourlySection } from './ui/components/HourlySection'
import { DailySection } from './ui/components/DailySection'
import { TodaySection } from './ui/components/TodaySection'

const App = (): JSX.Element => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const coords = useFetchCity('Barcelona')
  const forecast = useFetchWeather(coords?.latitude, coords?.longitude)

  useEffect(() => {
    const root = document.documentElement

    root.classList.remove(lightTheme.theme, darkTheme.theme)
    root.classList.add(theme === 'dark' ? darkTheme.theme : lightTheme.theme)
  }, [theme])

  if (!forecast?.temperature) return <p>Cargando datos...</p>
  return (
    <main>
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>Theme handler</button>
      <TodaySection coords={coords} forecast={forecast} />
      <DailySection daily_max={forecast?.daily_max} daily_min={forecast?.daily_min} />
      <HourlySection hourly={forecast?.hourly} />
    </main>
  )
}

export default App
