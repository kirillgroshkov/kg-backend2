import { metricValueDao } from '@src/services'

test('getAllMetricIdsByAccount', async () => {
  const a = await metricValueDao.getAllMetricIdsByAccount('mockorg1')
  console.log(a)
})

test('getAllByMetricId', async () => {
  const a = await metricValueDao.getAllByMetricId('mockorg1', 'metric2', { tsMinIncl: 2 })
  console.log(a)
})
