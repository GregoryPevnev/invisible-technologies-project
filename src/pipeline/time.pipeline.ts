import { Location, Time } from '../models'

const locationTime = (location: Location): Time => ({
  time: 'TIME',
  timezone: 'TZ'
})

export default locationTime
