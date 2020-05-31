import {
  weatherRequestURL,
  formatTemperature,
  toWeather,
  weatherErrorHandler
} from '../../src/pipeline/weather.pipeline'
import { Location } from '../../src/models'

const urlResult = 'url-result'
const degrees = 10
const temperature = {
  degrees,
  metric: 'Celsius'
}

// Impossible to remove duplication
jest.mock('../../src/utils', () => ({
  sequence: () => {}, // tslint:disable-line:no-empty
  withHandler: () => {}, // tslint:disable-line:no-empty
  toJSON: () => {}, // tslint:disable-line:no-empty
  buildURL: () => urlResult
}))

describe('Weather tests', () => {
  it('should format weather API request URL', () => {
    const url = 'http://url'
    const key = 'KEY'
    const location: any = {coordinates: { lat: 10, lon: 10 }}

    expect(weatherRequestURL(url)(key)(location)).toEqual(urlResult)
  })

  it('should format temperature', () => {
    expect(formatTemperature(degrees)).toEqual(temperature)
  })

  it('should throw error when transforming data into Weather model (No forecast)', () => {
    expect(() => toWeather({})).toThrow('No weather forecast for location')
    expect(() => toWeather({weather: []})).toThrow('No weather forecast for location')
  })

  it('should transform data into Weather model', () => {
    const description = 'DESCRIPTION'

    const data: any = {
      weather: [{ description }],
      main: { temp: degrees }
    }

    expect(toWeather(data)).toEqual({
      temperature,
      description
    })
  })

  it('should throw an error', () => {
    const errorMessage = 'MESSAGE'
    const address = 'ADDRESS'
    const location: any = { address }

    expect(() => weatherErrorHandler(new Error(errorMessage), location as Location))
      .toEqual(`Could not retrieve weather for the following address: ${address} - ${errorMessage}`)
  })
})
