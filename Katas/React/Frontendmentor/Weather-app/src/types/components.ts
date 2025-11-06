import { cityInfo } from './cities'
import { weatherInfo } from './weather'

export type MainCardProps = { coords: cityInfo; temperature: weatherInfo['temperature'] }
export type DataCardProps<K extends keyof weatherInfo> = { title: string; data: weatherInfo[K]; decoration: string }
export type DailyCardProps = { day: string; daily_max: number | undefined; daily_min: number | undefined }
export type HourlyCardProps = { hour: string; temperature: number }
