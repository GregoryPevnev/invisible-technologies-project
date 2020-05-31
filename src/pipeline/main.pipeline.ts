import { printInfo, readAddresses } from './io.pipeline'
import findLocation from './location.pipeline'
import locationTime from './time.pipeline'
import locationWeather from './weather.pipeline'
import formatInfo from './format.pipeline'
import { identity, parallel, runForEach, sequence, withHandler } from '../utils'
import { Info } from '../../../src/models'

type LocationInfoFunction = (address: string) => void | Promise<void>

export const infoErrorHandler = (error: Error, _: string): null => {
  console.log(error.message)

  return null
}

export const filterEmptyLocations = (info: Info[]): Info[] => info.filter((location: Info) => location !== null)

const locationInfo: LocationInfoFunction = sequence(
  readAddresses,
  runForEach(
    withHandler(
      sequence(
        findLocation,
        parallel(
          identity,
          locationTime,
          locationWeather
        ),
        formatInfo
      ),
      infoErrorHandler
    )
  ),
  filterEmptyLocations,
  printInfo
)

export default locationInfo
