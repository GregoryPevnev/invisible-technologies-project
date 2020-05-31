import { Location } from './location.model'
import { Time } from './time.model'
import { Weather } from './weather.model'

export interface Info {
  location: Location
  time: Time
  weather: Weather
}
