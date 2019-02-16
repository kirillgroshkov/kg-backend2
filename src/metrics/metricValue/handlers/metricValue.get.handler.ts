import { di } from '@src/container'
import { metricsBRService } from '@src/metrics/metrics.br.service'
import { MetricsBackendResponseBM } from '@src/metrics/metrics.model'
import { MetricValueDao } from '@src/metrics/metricValue/metricValue.dao'
import { MetricIdObject, TSMinMaxObject } from '@src/metrics/metricValue/metricValue.model'
import { RequestHandler } from 'express'

export const metricValueGetHandler: RequestHandler = async (req, res) => {
  const { metricId } = req.params as MetricIdObject
  const minMax = req.query as TSMinMaxObject
  const acc = await req.rc.requireAccount()

  const metricValueDao = di<MetricValueDao>('metricValueDao')
  const metricValues = await metricValueDao.getAllByMetricId(acc.id, metricId, minMax)

  const br: MetricsBackendResponseBM = {
    metricValues,
  }

  res.json(await metricsBRService.bmToFM(br))
}
