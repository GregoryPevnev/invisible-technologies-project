import { Location, Weather } from '../models'

const locationWeather = (location: Location): Weather => ({
  temperature: 'TEMP',
  description: 'DESC'
})

export default locationWeather
