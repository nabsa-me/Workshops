import { cityInfo } from '../../types/cities'
import { weatherInfo } from '../../types/weather'

export const MainCard = ({ coords, forecast }: { coords: cityInfo; forecast: weatherInfo | undefined }) => {
  return (
    <div className='main-card card'>
      {coords?.name}
      {forecast?.current}
    </div>
  )
}

export const DataCard = () => {
  return <div className='data-card card'>DataCard</div>
}

export const DailyCard = () => {
  return <div className='daily-card card'>DailyCard</div>
}

export const HourlyCard = () => {
  return <div className='hourly-card card'>HourlyCard</div>
}
