import { infoErrorHandler, filterEmptyLocations } from '../../src/pipeline/main.pipeline'
import Mock = jest.Mock
import { Info } from '../../src/models'

describe('Main pipeline tests', () => {
  let logMock: Mock

  beforeEach(() => {
    logMock = jest.fn()
    console.log = logMock
  })

  afterEach(() => {
    logMock.mockRestore()
  })

  it('should handle info error', () => {
    const message = 'MESSAGE'

    expect(infoErrorHandler(new Error(message), null)).toEqual(null)

    expect(logMock).toHaveBeenCalledWith(message)
  })

  it('should filter out empty locations', () => {
    const info: any = {}
    const infoList: Info[] = [null, info as Info, null]

    expect(filterEmptyLocations(infoList)).toEqual([info])
  })
})
