export interface Coordinates {
  lon: number
  lat: number
}

export interface Location {
  address: string
  coordinates: Coordinates
  timezone: string
}
