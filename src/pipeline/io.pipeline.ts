import { Info } from '../models'

export const readAddresses = (args: string): string[] =>
  args
    .split(',')
    .map((address: string) => address.trim())

export const printInfo = (locationInfo: Info[]): void => {
  console.log('Information about locations:')

  locationInfo.forEach((info: Info) => console.log(info))
}
