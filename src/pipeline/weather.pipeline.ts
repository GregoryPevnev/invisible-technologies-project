import { Location, Weather } from '../models'

export const locationWeather = (location: Location): Weather => ({
  temperature: 'TEMP',
  description: 'DESC'
})
