import { reqValidationMiddleware } from '@naturalcycles/backend-lib'
import { metricValueGetHandler } from '@src/metrics/metricValue/handlers/metricValue.get.handler'
import { metricValuePutHandler } from '@src/metrics/metricValue/handlers/metricValue.put.handler'
import {
  metricIdObjectSchema,
  metricValueInputSchema,
  tsMinMaxObjectSchema,
} from '@src/metrics/metricValue/metricValue.model'
import { getRouter } from '@src/server/router'

const router = getRouter()

router.put('/', reqValidationMiddleware('body', metricValueInputSchema), metricValuePutHandler)

router.get(
  '/:metricId',
  reqValidationMiddleware('params', metricIdObjectSchema),
  reqValidationMiddleware('query', tsMinMaxObjectSchema),
  metricValueGetHandler,
)

export const metricValueResource = router
