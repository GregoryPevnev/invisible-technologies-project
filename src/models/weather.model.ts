export type TemperatureMetric = 'Celsius' | 'Fahrenheit'

export interface Temperature {
  degrees: number
  metric: TemperatureMetric
}

export interface Weather {
  temperature: Temperature
  description: string
}
