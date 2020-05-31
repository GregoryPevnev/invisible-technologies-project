import { Info, Temperature, Time, Weather } from '../models'

export const readAddresses = (input: string): string[] =>
  input
    .split(',')
    .map((address: string) => address.trim())

const formatTimeInfo = ({ time}: Time): string => time

const formatTemperatureInfo = ({ degrees, metric }: Temperature): string =>
  `${degrees} degrees ${metric}`

const formatWeatherInfo = ({ temperature, description }: Weather): string =>
  `"${description}" and the temperature is ${formatTemperatureInfo(temperature)}`

const printLocationInfo = ({
                             location,
                             weather,
                             time
                           }: Info, entry: number): void => {
  if(entry !== 0)
    console.log('------------------------------------------------')

  console.log(`It's ${formatTimeInfo(time)} in ${location.address}`)
  console.log(`The weather is ${formatWeatherInfo(weather)}`)
}

export const printInfo = (locationInfo: Info[]): void => {
  console.log('Information about locations:')

  locationInfo.forEach(printLocationInfo)
}
