export interface TimeConfig {
  timeFormat: string
  defaultTimezone: string
}

export const timeConfig: TimeConfig = {
  timeFormat: 'h:mma',
  defaultTimezone: 'America/New_York'
}
