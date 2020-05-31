import pipeline from '../../src/pipeline'

jest.mock('../../src/pipeline/main.pipeline', () =>
  (data: any): any => data
)

describe('Pipeline interface test', () => {
  it('should prepare arguments', () => {
    const args: string[] = ['1', '2']
    const result: string = args.join(' ')

    expect(pipeline(args)).toEqual(result)
  })
})
