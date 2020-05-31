import { addressesInfo } from './pipeline'

const paramsToString = (params: string[]): string => params.join(' ')

const args = process.argv.slice(2)

if(args.length < 1) {
  console.log('Provide at least one location')

  process.exit(1)
}

addressesInfo(paramsToString(args))

