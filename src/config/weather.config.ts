interface WeatherConfig {
  url: string
  apiKey: string
}

export const weatherConfig: WeatherConfig = {
  url: 'http://api.openweathermap.org/data/2.5/weather',
  apiKey: '159753ff4cd992ab689174817d89d293'
}
