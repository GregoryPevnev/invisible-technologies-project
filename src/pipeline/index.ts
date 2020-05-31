import { printInfo, readAddresses } from './io.pipeline'
import { findLocation } from './location.pipeline'
import { locationTime } from './time.pipeline'
import { locationWeather } from './weather.pipeline'
import { formatInfo } from './format.pipeline'
import { identity, parallel, runForEach, sequence } from '../utils'

export const addressesInfo = sequence(
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
