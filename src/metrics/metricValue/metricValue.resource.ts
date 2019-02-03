import { metricValueGetHandler } from '@src/metrics/metricValue/handlers/metricValue.get.handler'
import { metricValuePutHandler } from '@src/metrics/metricValue/handlers/metricValue.put.handler'
import {
  metricIdObjectSchema,
  metricValueInputSchema,
  tsMinMaxObjectSchema,
} from '@src/metrics/metricValue/metricValue.model'
import { reqValidationMiddleware } from '@src/server/handlers/reqValidation.mw'
import { ReqRouter } from '@src/server/req.router'

const router = new ReqRouter()
export const metricValueResource = router.resource

router.put('/', reqValidationMiddleware('body', metricValueInputSchema), metricValuePutHandler)

router.get(
  '/:metricId',
  reqValidationMiddleware('params', metricIdObjectSchema),
  reqValidationMiddleware('query', tsMinMaxObjectSchema),
  metricValueGetHandler,
)
