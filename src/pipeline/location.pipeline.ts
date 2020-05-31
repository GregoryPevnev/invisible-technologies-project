import { Location } from '../models'

export const findLocation = (address: string): Location => ({
  address,
  coordinates: {
    lat: 10,
    lon: 10
  },
  timezone: 'TIMEZONE'
})
