import fetch from 'node-fetch'
import { weatherConfig } from '../config'
import { Location, Temperature, Weather } from '../models'
import { sequence, buildURL, toJSON } from '../utils'

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
    'lat': lat.toString(),
    'lon': lon.toString(),
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

const locationWeather: WeatherFunction =
  sequence(
    weatherRequestURL(weatherConfig.url)(weatherConfig.apiKey),
    fetch,
    toJSON,
    toWeather
  )

export default locationWeather
