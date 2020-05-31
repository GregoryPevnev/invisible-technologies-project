import { Location, Time, Weather, Info } from '../models'

const formatInfo = ([location, time, weather]: [Location, Time, Weather]): Info => ({
  location,
  time,
  weather
})

export default formatInfo
