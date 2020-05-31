import fetch from 'node-fetch'
import { weatherConfig } from '../config'
import { Location, Temperature, Weather } from '../models'
import { sequence, buildURL, toJSON, withHandler } from '../utils'

type WeatherFunction = (location: Location) => Promise<Weather>|Weather

interface WeatherData {
  weather: {
    description: string
  }[]
  main: {
    temp: number
  }
}

export const weatherRequestURL = (weatherURL: string) => (weatherKey: string) => ({ coordinates: { lat, lon } }: Location) =>
  buildURL(weatherURL, {
    'appid': weatherKey,
    'lat': String(lat),
    'lon': String(lon),
    'units': 'metric'
  })

export const formatTemperature = (degrees: number): Temperature => ({
  degrees,
  metric: 'Celsius'
})

export const toWeather = (data: any): Weather => {
  if (!data.weather || !data.main || data.weather.length === 0)
    throw new Error('No weather forecast for location')

  const {
    weather: [{ description }],
    main: { temp }
  }: WeatherData = data

  return {
    temperature: formatTemperature(temp),
    description
  }
}

export const weatherErrorHandler = (error: Error, location: Location) => {
  throw new Error(`Could not retrieve weather for the following address: ${location.address} - ${error.message}`)
}

const locationWeather: WeatherFunction =
  withHandler(
    sequence(
      weatherRequestURL(weatherConfig.url)(weatherConfig.apiKey),
      fetch,
      toJSON,
      toWeather
    ),
    weatherErrorHandler
  )

export default locationWeather
