import { readAddresses, printInfo } from '../../../src/pipeline/io'
import { Info } from '../../src/models'
import Mock = jest.Mock

const info: Info = {
  location: {
    address: 'ADDRESS',
    coordinates: {
      lon: 10,
      lat: 10
    },
    timezone: 'TZ'
  },
  weather: {
    temperature: {
      degrees: 10,
      metric: 'Celsius'
    },
    description: 'DESCRIPTION'
  },
  time: {
    time: 'TIME',
    timezone: 'TZ'
  }
}

describe('IO pipeline tests', () => {
  let logMock: Mock

  beforeEach(() => {
    logMock = jest.fn()
    console.log = logMock
  })

  afterEach(() => {
    logMock.mockRestore()
  })

  it('should read addresses', () => {
    const items = ['1', '2', '3']
    const input = items.join(', ')

    expect(readAddresses(input)).toEqual(items)
  })

  it('should print single information entry', () => {
    printInfo([info])

    expect(logMock.mock.calls).toEqual([
      ['Information about locations:'],
      [`It's ${info.time.time} in ${info.location.address}`],
      [`The weather is "${info.weather.description}" and the temperature is `
        + `${info.weather.temperature.degrees} degrees ${info.weather.temperature.metric}`]
    ])
  })

  it('should print information entries', () => {
    printInfo([info, info])

    expect(logMock).toHaveBeenCalledWith('-----------------------------------------------')
  })
})
