import { MetricValueBM, MetricValueInput } from '@src/metrics/metricValue/metricValue.model'
import { mockAccount1 } from '@src/test/mock/account.mock'
import { mockMetric1 } from '@src/test/mock/metric.mock'
import { MOCK_TS } from '@src/test/mock/mock.cnst'

export function mockMetricValue1 (): MetricValueBM {
  const acc = mockAccount1()
  const metric = mockMetric1()

  return {
    accountId: acc.id,
    metricId: metric.id,
    created: MOCK_TS,
    updated: MOCK_TS,
    ts: MOCK_TS,
    v: 10,
  }
}

export function mockMetricValueInput1 (): MetricValueInput {
  const metric = mockMetric1()

  return {
    metricId: metric.id,
    ts: MOCK_TS,
    v: 10,
  }
}
