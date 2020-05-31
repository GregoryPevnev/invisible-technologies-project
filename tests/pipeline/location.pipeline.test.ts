import {
  locationRequestURL,
  toLocation,
  locationErrorHandler
} from '../../src/pipeline/location.pipeline'

const urlResult = 'url-result'

// Impossible to remove duplication
jest.mock('../../src/utils', () => ({
  sequence: () => {}, // tslint:disable-line:no-empty
  withHandler: () => {}, // tslint:disable-line:no-empty
  toJSON: () => {}, // tslint:disable-line:no-empty
  buildURL: () => urlResult
}))

describe('Location pipeline tests', () => {
  it('should format weather API request URL', () => {
    const url = 'http://url'
    const key = 'KEY'
    const location: any = {coordinates: { lat: 10, lon: 10 }}

    expect(locationRequestURL(url)(key)(location)).toEqual(urlResult)
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

  it('should throw an error', () => {
    const errorMessage = 'MESSAGE'
    const address = 'ADDRESS'

    expect(() => locationErrorHandler(new Error(errorMessage), address))
      .toEqual(`Could not find the following address: ${address} - ${errorMessage}`)
  })
})
