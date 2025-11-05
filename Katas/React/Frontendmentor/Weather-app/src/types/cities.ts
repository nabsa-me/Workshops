export type apiCityData = {
  place_id: number
  licence: string
  osm_type: 'relation' | string
  osm_id: number
  lat: string
  lon: string
  class: 'boundary' | string
  type: 'administrative' | string
  place_rank: number
  importance: number
  addresstype: 'city' | string
  name: string
  display_name: string
  boundingbox: string[]
}

export type cityCoordinates = {
  latitude: string | null
  longitude: string | null
}

export type cityInfo = { name: string | null } & cityCoordinates
