import { Location, Time, Weather, Info } from '../models'

export const formatInfo = ([location, time, weather]: [Location, Time, Weather]): Info => ({
  location,
  time,
  weather
})
