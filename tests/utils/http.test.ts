import { Response } from 'node-fetch'
import { buildURL, toJSON } from '../../src/utils'

describe('HTTP utilities tests', () => {
  it('should location API request URL', () => {
    const url = 'http://location-api'
    const key = 'KEY'

    expect(buildURL(url, { key }))
      .toEqual(`${url}/?key=${key}`)
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
})
