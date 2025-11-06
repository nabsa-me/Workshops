import { DailyCardProps, DataCardProps, HourlyCardProps, MainCardProps } from '../../types/components'
import { weatherInfo } from '../../types/weather'
import { roundNumber } from '../../utils/helpers'

export const MainCard = ({ coords, temperature }: MainCardProps) => {
  const date = new Date()
  const longDate = date.toLocaleDateString('en-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className='main-card card'>
      <div>{coords?.name}</div>
      <div>{longDate.charAt(0).toUpperCase() + longDate.slice(1)}</div>
      <div>{roundNumber(temperature)} C</div>
    </div>
  )
}

export const DataCard = <K extends keyof weatherInfo>({ title, data, decoration }: DataCardProps<K>) => {
  return (
    <div className='data-card card'>
      <div>{title}</div>
      <div>
        {roundNumber(data)} {decoration}
      </div>
    </div>
  )
}

export const DailyCard = ({ day, daily_max, daily_min }: DailyCardProps) => {
  return (
    <div className='daily-card card'>
      <div>{day}</div>
      <div>
        <div>{roundNumber(daily_max)} C</div>
        <div>{roundNumber(daily_min)} C</div>
      </div>
    </div>
  )
}

export const HourlyCard = ({ hour, temperature }: HourlyCardProps) => {
  return (
    <div className='hourly-card card'>
      {hour}
      {roundNumber(temperature)} C
    </div>
  )
}
