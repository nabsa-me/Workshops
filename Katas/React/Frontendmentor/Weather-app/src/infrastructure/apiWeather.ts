import { fetchWeatherApi } from 'openmeteo'
import { weatherInfo } from '../types/weather'

export const fetchWeatherInfo = async (latitude: string, longitude: string): Promise<weatherInfo> => {
  try {
    const params = {
      latitude,
      longitude,
      current_weather: true,
      hourly: [
        'temperature_2m',
        'apparent_temperature',
        'precipitation',
        'rain',
        'showers',
        'snowfall',
        'snow_depth',
        'pressure_msl',
        'surface_pressure',
        'cloudcover',
        'cloudcover_low',
        'cloudcover_mid',
        'cloudcover_high',
        'windspeed_10m',
        'winddirection_10m',
        'windgusts_10m',
        'shortwave_radiation',
        'direct_radiation',
        'diffuse_radiation',
        'evapotranspiration',
        'soil_temperature_0cm',
        'soil_moisture_0_1cm'
      ],
      daily: [
        'uv_index_max',
        'temperature_2m_max',
        'temperature_2m_min',
        'apparent_temperature_max',
        'apparent_temperature_min',
        'precipitation_sum',
        'rain_sum',
        'showers_sum',
        'snowfall_sum',
        'precipitation_hours',
        'windspeed_10m_max',
        'windgusts_10m_max',
        'winddirection_10m_dominant',
        'shortwave_radiation_sum',
        'sunrise',
        'sunset',
        'uv_index_clear_sky_max'
      ],
      current: ['temperature_2m', 'relative_humidity_2m', 'apparent_temperature'],
      timezone: 'auto'
    }

    const responses = await fetchWeatherApi('https://api.open-meteo.com/v1/forecast', params)
    const res = responses[0]
    const current = res.current()
    const hourly = res.hourly()
    const daily = res.daily()

    return {
      current: current?.variables(0)?.value(),
      hourly: hourly?.variables(0)?.valuesArray(),
      daily: daily?.variables(0)?.valuesArray()
    }
  } catch (err) {
    console.error(err)
    throw new Error('Error al obtener los datos.')
  }
}
