import { Response } from 'node-fetch'

interface Params {
  [param: string]: string
}

export const toJSON = (res: Response): any => res.json()

export const buildURL = (baseURL: string, params: Params) =>
  Object.keys(params).reduce((urlBuilder: URL, paramName: string) => {
    urlBuilder.searchParams.append(paramName, params[paramName].toString())

    return urlBuilder
  }, new URL(baseURL)).toString()
