import { MetricValueBM, MetricValueInput } from '@src/metrics/metricValue/metricValue.model'
import { MOCK_TS } from '@src/test/mock/mock.cnst'
import { mockAccount1 } from '../account/account.mock'

export function mockMetricValue1 (): MetricValueBM {
  const acc = mockAccount1()

  return {
    accountId: acc.id,
    metricId: 'metric1',
    created: MOCK_TS,
    updated: MOCK_TS,
    ts: MOCK_TS,
    v: 10,
  }
}

export function mockMetricValueInput1 (): MetricValueInput {
  return {
    metricId: 'metric1',
    ts: MOCK_TS,
    v: 10,
  }
}

export function mockMetricValueInput1_2 (): MetricValueInput {
  return {
    metricId: 'metric2',
    ts: MOCK_TS + 2,
    v: 11,
  }
}
