import { metricsAppInitHanlder } from '@src/metrics/app/handlers/metrics.app.init.handler'
import { getRouter } from '@src/server/router'

const router = getRouter()
export const metricsAppResource = router

router.get('/init', metricsAppInitHanlder)
