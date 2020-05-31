import moment from 'moment-timezone'
import { timeConfig } from '../config'
import { Location, Time } from '../models'

export const timezoneCurrentTime = (timezone: string): string => moment().tz(timezone).format(timeConfig.timeFormat)

const locationTime = ({timezone}: Location): Time => ({
  time: timezoneCurrentTime(timezone || timeConfig.defaultTimezone),
  timezone: timezone || timeConfig.defaultTimezone
})

export default locationTime
