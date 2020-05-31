import fetch from 'node-fetch'
import { locationsConfig } from '../config'
import { Location } from '../models'
import { sequence, toJSON, buildURL } from '../utils'

type LocationFunction = (address: string) => Promise<Location>|Location

interface LocationData {
  formatted: string
  geometry: {
    lat: number
    lng: number
  }
  annotations: {
    timezone: {
      name: string
    }
  }
}

export const locationRequestURL = (locationURL: string) => (locationKey: string) => (address: string): string =>
  buildURL(locationURL, { 'key': locationKey, 'q': address })

export const toLocation = (data: any): Location => {
  if (!data.results || data.results.length === 0)
    throw new Error('No locations were found')

  const {
    formatted,
    geometry: { lat, lng },
    annotations: { timezone: { name } }
  }: LocationData = data.results[0]

  return {
    address: formatted,
    coordinates: {
      lat,
      lon: lng
    },
    timezone: name
  }
}

const findLocation: LocationFunction =
  sequence(
    locationRequestURL(locationsConfig.url)(locationsConfig.apiKey),
    fetch,
    toJSON,
    toLocation
  )

export default findLocation
