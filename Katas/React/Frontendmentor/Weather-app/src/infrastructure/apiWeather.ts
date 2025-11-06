import { fetchWeatherApi } from 'openmeteo'
import { weatherInfo } from '../types/weather'

export const fetchWeatherInfo = async (latitude: string, longitude: string): Promise<weatherInfo> => {
  try {
    const params = {
      latitude,
      longitude,
      daily: ['temperature_2m_max', 'temperature_2m_min'],
      current: ['temperature_2m', 'apparent_temperature', 'relative_humidity_2m', 'wind_speed_10m', 'precipitation'],
      hourly: 'temperature_2m'
    }

    const responses = await fetchWeatherApi('https://api.open-meteo.com/v1/forecast', params)
    const res = responses[0]
    const current = res.current()
    const daily = res.daily()
    const hourly = res.hourly()

    return {
      temperature: current?.variables(0)?.value(),
      feels_like: current?.variables(1)?.value(),
      humidity: current?.variables(2)?.value(),
      wind: current?.variables(3)?.value(),
      precipitation: current?.variables(4)?.value(),
      daily_max: daily?.variables(0)?.valuesArray(),
      daily_min: daily?.variables(1)?.valuesArray(),
      hourly: hourly?.variables(0)?.valuesArray()
    }
  } catch (err) {
    console.error(err)
    throw new Error('Error al obtener los datos.')
  }
}
