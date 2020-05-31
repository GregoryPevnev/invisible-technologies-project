import { identity } from '../../src/utils'

describe('Helper utilities tests', () => {
  it('should return the passed value', () => {
    const value = 'VALUE'

    expect(identity(value)).toEqual(value)
  })
})
