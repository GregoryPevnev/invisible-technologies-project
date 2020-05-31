import { Location, Time, Weather, Info } from '../models'
import { im } from '../utils/helpers';

const formatInfo = ([location, time, weather]: [Location, Time, Weather]): Info => im({
  location,
  time,
  weather
})

export default formatInfo
