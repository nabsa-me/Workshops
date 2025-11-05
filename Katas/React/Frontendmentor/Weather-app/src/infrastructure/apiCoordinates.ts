import { apiCityData, cityInfo } from '../types/cities'

const getCityNames = (name: string): string => {
  const newName = name.split(',')
  return String(newName[0] + ',' + newName[newName.length - 1])
}

export const fetchCoordinatesFromCity = async (city: string): Promise<cityInfo> => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=10`
    )
    const data: apiCityData[] = await res.json()

    return {
      name: getCityNames(data[0].display_name),
      latitude: data[0].lat,
      longitude: data[0].lon
    }
  } catch (error) {
    console.error(error)
    throw new Error('Error on fetching city data')
  }
}
