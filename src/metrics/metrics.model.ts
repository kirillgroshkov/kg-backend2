import { AccountBM, AccountFM } from '@src/metrics/account/account.model'
import { MetricValueBM, MetricValueFM } from '@src/metrics/metricValue/metricValue.model'

export interface MetricsBackendResponseBM {
  metricIds?: string[]

  metricValues?: MetricValueBM[]

  account?: AccountBM
}

export interface MetricsBackendResponseFM {
  metricIds?: string[]

  metricValues?: MetricValueFM[]

  account?: AccountFM
}
