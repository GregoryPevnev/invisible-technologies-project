import { toLocation } from '../../src/pipeline/location.pipeline'

describe('Location pipeline tests', () => {
  it('should throw error when transforming data into Location model (No locations)', () => {
    expect(() => toLocation({})).toThrow('No locations were found')
    expect(() => toLocation({results: []})).toThrow('No locations were found')
  })

  it('should transform data into Location model', () => {
    const formatted = 'FORMATTED'
    const lat = 'LAT'
    const lng = 'LNG'
    const timezone = 'TIMEZONE'
    const data: any = {
      results: [
        {
          formatted,
          geometry: { lat, lng },
          annotations: { timezone: { name: timezone } }
        }
      ]
    }

    expect(toLocation(data)).toEqual({
      address: formatted,
      coordinates: {
        lat,
        lon: lng
      },
      timezone
    })
  })
})
