import moment from 'moment-timezone'
import { timeConfig } from '../config'
import { Location, Time } from '../models'
import { im } from '../utils/helpers';

export const timezoneCurrentTime = (timezone: string): string => moment().tz(timezone).format(timeConfig.timeFormat)

const locationTime = ({timezone}: Location): Time => im({
  time: timezoneCurrentTime(timezone || timeConfig.defaultTimezone),
  timezone: timezone || timeConfig.defaultTimezone
})

export default locationTime
