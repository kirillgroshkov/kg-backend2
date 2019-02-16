import { di } from '@src/container'
import { createdUpdatedFields } from '@src/db/model.util'
import { MetricValueDao } from '@src/metrics/metricValue/metricValue.dao'
import { MetricValueInput } from '@src/metrics/metricValue/metricValue.model'
import { RequestHandler } from 'express'

export const metricValuePutHandler: RequestHandler = async (req, res) => {
  const input: MetricValueInput = req.body
  const acc = await req.rc.requireAccount()

  const metricValueDao = di<MetricValueDao>('metricValueDao')
  await metricValueDao.save({
    ...input,
    accountId: acc.id,
    ...createdUpdatedFields(),
  })

  res.status(201).end() // HTTP 201: Created
}
