export type weatherInfo = {
  current: number | undefined
  daily: Float32Array<ArrayBufferLike> | null | undefined
  hourly: Float32Array<ArrayBufferLike> | null | undefined
}
