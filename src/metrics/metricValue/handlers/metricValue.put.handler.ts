import { createdUpdatedFields } from '@src/db/model.util'
import { MetricValueInput } from '@src/metrics/metricValue/metricValue.model'
import { ReqHandler } from '@src/server/server.model'
import { metricValueDao } from '@src/services'

export const metricValuePutHandler: ReqHandler = async (req, res) => {
  const input: MetricValueInput = req.body
  const acc = await req.rc.requireAccount()

  await metricValueDao.save({
    ...input,
    accountId: acc.id,
    ...createdUpdatedFields(),
  })

  res.status(201).end() // HTTP 201: Created
}
