import formatInfo from '../../src/pipeline/format.pipeline'

describe('Format pipeline tests', () => {
  it('should format information', () => {
    const location: any = 'location'
    const time: any = 'time'
    const weather: any = 'weather'

    expect(formatInfo([location, time , weather])).toEqual({
      location,
      time,
      weather
    })
  })
})
