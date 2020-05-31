export const identity = (value: any) => value

export const im = <T>(obj: T): T => Object.freeze({...obj})
