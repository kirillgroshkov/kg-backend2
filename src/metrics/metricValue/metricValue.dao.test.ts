import { di } from '@src/container'
import { MetricValueDao } from '@src/metrics/metricValue/metricValue.dao'

test('getAllMetricIdsByAccount', async () => {
  const a = await di(MetricValueDao).getAllMetricIdsByAccount('mockorg1')
  console.log(a)
})

test('getAllByMetricId', async () => {
  const a = await di(MetricValueDao).getAllByMetricId('mockorg1', 'metric2', { tsMinIncl: 2 })
  console.log(a)
})
