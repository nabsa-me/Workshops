import { useEffect, useState } from 'react'
import { fetchWeatherInfo } from '../../infrastructure/apiWeather'
import { cityCoordinates } from '../../types/cities'
import { weatherInfo } from '../../types/weather'

export const useFetchWeather = (
  latitude: cityCoordinates['latitude'],
  longitude: cityCoordinates['longitude']
): weatherInfo | undefined => {
  //States
  const [forecast, setForecast] = useState<weatherInfo>()

  //Functions
  const getForecast = async () => {
    if (!latitude || !longitude) return

    try {
      const weatherInfo = await fetchWeatherInfo(latitude, longitude)
      setForecast(weatherInfo)
    } catch (error) {
      console.log(error)
    }
  }

  //Hooks
  useEffect(() => {
    if (latitude && longitude) getForecast()
  }, [latitude, longitude])

  return forecast
}
