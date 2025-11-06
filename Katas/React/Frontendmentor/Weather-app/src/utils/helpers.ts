import { weatherInfo } from '../types/weather'

export const roundNumber = (number: weatherInfo[keyof weatherInfo]): number => {
  return Math.round(Number(number))
}
