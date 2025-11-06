import { cityInfo } from '../../types/cities'
import { weatherInfo } from '../../types/weather'
import { DataCard, MainCard } from './cards'

export const TodaySection = ({ coords, forecast }: { coords: cityInfo; forecast: weatherInfo }) => {
  return (
    <section className='section-container'>
      <h2>Today</h2>
      <div className='daily-container'>
        <MainCard coords={coords} temperature={forecast?.temperature} />
        <div className='daily-detail-container grid'>
          <DataCard title='Feels like' data={forecast?.feels_like} decoration='C' />
          <DataCard title='Humidity' data={forecast?.humidity} decoration='%' />
          <DataCard title='Wind' data={forecast?.wind} decoration='km/h' />
          <DataCard title='Precipitation' data={forecast?.precipitation} decoration='mm' />
        </div>
      </div>
    </section>
  )
}
