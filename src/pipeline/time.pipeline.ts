import { Location, Time } from '../models'

export const locationTime = (location: Location): Time => ({
  time: 'TIME',
  timezone: 'TZ'
})
