import { useEffect, useState } from 'react'
import { fetchCoordinatesFromCity } from '../../infrastructure/apiCoordinates'
import { cityInfo } from '../../types/cities'

export const useFetchCity = (city: string) => {
  //States
  const [coords, setCoords] = useState<cityInfo>({ name: null, latitude: null, longitude: null })

  //Functions
  const getCoords = async () => {
    if (!city) return
    try {
      const cityCoordinates = await fetchCoordinatesFromCity(city)
      setCoords(cityCoordinates)
    } catch (error) {
      console.error(error)
    }
  }

  //Hooks
  useEffect(() => {
    if (city) getCoords()
  }, [city])

  return coords
}
