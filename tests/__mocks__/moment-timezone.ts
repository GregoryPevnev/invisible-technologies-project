const moment = () => ({
  tz: jest.fn((timezone: string) => ({
    format: jest.fn((format: string) => `${timezone}-${format}`)
  }))
})

export default moment
