import { weatherInfo } from '../../types/weather'
import { DailyCard } from './cards'

export const DailySection = ({
  daily_max,
  daily_min
}: {
  daily_max: weatherInfo['daily_max']
  daily_min: weatherInfo['daily_min']
}) => {
  const dailyArray = ['Mon', 'Tue', 'Wed', 'Thu', 'Fry', 'Sat', 'Sun']

  return (
    <section className='section-container'>
      <h2>Week forecast</h2>
      <div className='weekly-container grid'>
        {dailyArray.map((day, index) => (
          <DailyCard day={day} key={index} daily_max={daily_max?.[index]} daily_min={daily_min?.[index]} />
        ))}
      </div>
    </section>
  )
}
