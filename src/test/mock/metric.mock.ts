import { MetricBM } from '@src/metrics/metric/metric.model'
import { mockAccount1 } from '@src/test/mock/account.mock'
import { MOCK_TS } from '@src/test/mock/mock.cnst'

export function mockMetric1 (): MetricBM {
  const acc = mockAccount1()

  return {
    id: 'metric1',
    created: MOCK_TS,
    updated: MOCK_TS,
    accountId: acc.id,
  }
}

export function mockMetric1_2 (): MetricBM {
  const acc = mockAccount1()

  return {
    id: 'metric2',
    created: MOCK_TS,
    updated: MOCK_TS,
    accountId: acc.id,
  }
}
