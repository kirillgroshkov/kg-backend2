import { metricsBRService } from '@src/metrics/metrics.br.service'
import { MetricsBackendResponseBM } from '@src/metrics/metrics.model'
import { metricValueDao } from '@src/services'
import { RequestHandler } from 'express'

export const metricsAppInitHanlder: RequestHandler = async (req, res) => {
  const account = await req.rc.requireAccount()

  const metricIds = await metricValueDao.getAllMetricIdsByAccount(account.id)

  const br: MetricsBackendResponseBM = {
    metricIds,
    account,
  }

  res.json(await metricsBRService.bmToFM(br))
}
