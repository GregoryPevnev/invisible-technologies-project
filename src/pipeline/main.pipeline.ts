import { printInfo, readAddresses } from './io.pipeline'
import findLocation from './location.pipeline'
import locationTime from './time.pipeline'
import locationWeather from './weather.pipeline'
import formatInfo from './format.pipeline'
import { identity, parallel, runForEach, sequence } from '../utils'

type LocationInfoFunction = (address: string) => void | Promise<void>

const locationInfo: LocationInfoFunction = sequence(
  readAddresses,
  runForEach(
    sequence(
      findLocation,
      parallel(
        identity,
        locationTime,
        locationWeather
      ),
      formatInfo
    )
  ),
  printInfo
)

export default locationInfo
