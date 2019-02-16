import { di } from '@src/container'
import { metricsBRService } from '@src/metrics/metrics.br.service'
import { MetricsBackendResponseBM } from '@src/metrics/metrics.model'
import { MetricValueDao } from '@src/metrics/metricValue/metricValue.dao'
import { RequestHandler } from 'express'

export const metricsAppInitHanlder: RequestHandler = async (req, res) => {
  const account = await req.rc.requireAccount()
  const metricValueDao = di<MetricValueDao>('metricValueDao')

  const metricIds = await metricValueDao.getAllMetricIdsByAccount(account.id)

  const br: MetricsBackendResponseBM = {
    metricIds,
    account,
  }

  res.json(await metricsBRService.bmToFM(br))
}
