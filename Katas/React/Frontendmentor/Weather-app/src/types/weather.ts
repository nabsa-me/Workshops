export type weatherInfo = {
  temperature: number | undefined
  feels_like: number | undefined
  humidity: number | undefined
  wind: number | undefined
  precipitation: number | undefined
  daily_max: Float32Array<ArrayBufferLike> | null | undefined
  daily_min: Float32Array<ArrayBufferLike> | null | undefined
  hourly: Float32Array<ArrayBufferLike> | null | undefined
}
