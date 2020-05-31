import { identity, im } from '../../src/utils'

describe('Helper utilities tests', () => {
  it('should return the passed value', () => {
    const value = 'VALUE'

    expect(identity(value)).toEqual(value)
  })

  it('should make object immutable', () => {
    const data: any = { a: 1 }

    const imData = im(data)

    expect(() => {
      imData.b = 2
    }).toThrow()
  })
})
