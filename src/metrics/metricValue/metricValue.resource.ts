import { metricValuePutHandler } from '@src/metrics/metricValue/handlers/metricValue.put.handler'
import { metricValueInputSchema } from '@src/metrics/metricValue/metricValue.model'
import { reqValidationMiddleware } from '@src/server/handlers/reqValidation.mw'
import { ReqRouter } from '@src/server/req.router'

const router = new ReqRouter()
export const metricValueResource = router.resource

router.put('/', reqValidationMiddleware('body', metricValueInputSchema), metricValuePutHandler)
