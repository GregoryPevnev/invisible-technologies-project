import { locationRequestURL, toJSON, toLocation } from '../../src/pipeline/location.pipeline'
import { Response } from 'node-fetch'

describe('Location pipeline tests', () => {
  it('should location API request URL', () => {
    const locationURL = 'http://location-api'
    const locationKey = 'KEY'
    const address = 'ADDRESS'

    expect(locationRequestURL(locationURL)(locationKey)(address))
      .toEqual(`${locationURL}/?key=${locationKey}&q=${address}`)
  })

  it('should transform response data into JSON', () => {
    const json = 'JSON'
    const response: any = {
      json: jest.fn(() => json)
    }

    const jsonResult = toJSON(response as Response)

    expect(jsonResult).toEqual(json)
    expect(response.json).toHaveBeenCalledTimes(1)
  })

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
