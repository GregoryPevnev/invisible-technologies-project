import { sequence, parallel, runForEach } from '../../src/utils'

const timedFunction = (time: number, cb: CallableFunction): (value: any) => Promise<void> =>
  (value: any) => new Promise<void>((res: CallableFunction) =>
    setTimeout(() => {
      cb(value)
      res()
    }, time)
  )

describe('Composition utilities tests', () => {
  const callResults: number[] = []

  const add1 = timedFunction(30, () => callResults.push(1))
  const add2 = timedFunction(20, () => callResults.push(2))
  const add3 = timedFunction(10, () => callResults.push(3))

  beforeEach(() => {
    callResults.splice(0, callResults.length)
  })

  it('should execute functions in sequence', async () => {
    await sequence(
      add1,
      add2,
      add3
    )(null)

    expect(callResults).toEqual([1, 2, 3])
  })

  it('should build a pipeline', async () => {
    const initial = 10

    const result = await sequence(
      (current: number) => Promise.resolve(current + 1),
      (current: number) => current + 2,
      (current: number) => Promise.resolve(current + 3),
    )(initial)

    expect(result).toBe(initial + 1 + 2 + 3)
  })

  it('should execute functions in parallel', async () => {
    await parallel(
      add1,
      add2,
      add3
    )(null)

    expect(callResults).toEqual([3, 2, 1])
  })

  it('should run function for each argument', async () => {
    const value = 'VALUE'
    const params = [1, 2, 3]

    const mockFunction = jest.fn(() => value)

    const result = await runForEach(mockFunction)(params)

    expect(result).toEqual(params.map(() => value))

    expect(mockFunction).toHaveBeenCalledTimes(params.length)
    params.forEach(param => expect(mockFunction).toHaveBeenCalledWith(param))
  })
})
