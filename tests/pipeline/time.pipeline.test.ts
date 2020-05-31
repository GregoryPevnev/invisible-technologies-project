import locationTime, { timezoneCurrentTime } from '../../src/pipeline/time.pipeline'
import { Location } from '../../src/models'

jest.mock('../../src/config', () => ({
  timeConfig: {
    timeFormat: 'FORMAT',
    defaultTimezone: 'DEFAULT'
  }
}))

describe('Time pipeline tests', () => {
  const timezone = 'TZ'

  it('should get current time from a timezone', () => {
    expect(timezoneCurrentTime(timezone)).toEqual(`${timezone}-FORMAT`)
  })

  it('should get time at a location with the specific time zone', () => {
    const location: any = { timezone }

    expect(locationTime(location as Location)).toEqual({
      time: `${timezone}-FORMAT`,
      timezone
    })
  })

  it('should get time at a location with the default time zone', () => {
    const location: any = {}

    expect(locationTime(location as Location)).toEqual({
      time: 'DEFAULT-FORMAT',
      timezone: 'DEFAULT'
    })
  })
})
