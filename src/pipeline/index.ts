import locationInfo from './main.pipeline'

const paramsToString = (params: string[]): string => params.join(' ')

const pipeline = (args: string[]) => locationInfo(paramsToString(args))

export default pipeline
