export interface MetricValue {
  /**
   * ${metricId}_${ts}
   */
  id: string

  orgId: string
  metricId: string
  ts: number
  v: number
  meta: any
  url?: string
}
