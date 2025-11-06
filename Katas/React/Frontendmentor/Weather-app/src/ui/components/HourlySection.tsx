import { useEffect, useState } from 'react'
import { weatherInfo } from '../../types/weather'
import { HourlyCard } from './cards'

const hourlyArray = ['0 AM', '2 AM', '4 AM', '6 AM', '8 AM', '10 AM', '12 PM', '2 PM', '4 PM', '6 PM', '8 PM', '10 PM']
const week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export const HourlySection = ({ hourly }: { hourly: weatherInfo['hourly'] }) => {
  const [selectedIndexDay, setSelectedIndexDay] = useState<number>(0)
  const [hourlyTemperatures, setHourlyTemperatures] = useState<number[]>([])

  const hoursDailyArray = hourly?.reduce<number[][]>((acc, curr, index) => {
    const chunkIndex = Math.floor(index / 24)
    if (!acc[chunkIndex]) acc[chunkIndex] = []
    acc[chunkIndex].push(curr)
    return acc
  }, [])

  useEffect(() => {
    const selectedTemperatures = hoursDailyArray?.[selectedIndexDay]

    const hourlyTemperatures = selectedTemperatures?.reduce<number[]>((acc, curr, index) => {
      const selectedIndex = Math.floor(index / 2) * 2
      if (index === selectedIndex) acc.push(curr)
      return acc
    }, [])

    if (hourlyTemperatures?.length) setHourlyTemperatures(hourlyTemperatures)
  }, [selectedIndexDay])

  return (
    <section className='section-container hourly-section'>
      <div className='hourly-menu'>
        <h2>Hourly forecast</h2>
        <button onClick={() => setSelectedIndexDay(selectedIndexDay < 6 ? selectedIndexDay + 1 : 0)}>
          {week[selectedIndexDay]}
        </button>
      </div>
      <div className='hourly-list'>
        {hourlyArray.map((hour, index) => (
          <HourlyCard key={index} hour={hour} temperature={hourlyTemperatures[index]} />
        ))}
      </div>
    </section>
  )
}
