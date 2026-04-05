export interface FailureMode {
  id: string
  name: string
  description: string
  lambda: number // failures per unit time
  mttr: number // mean time to repair (minutes)
  code?: string
}

export interface ParetoDataPoint extends FailureMode {
  cumulativeDowntime: number
  cumulativePercent: number
}
