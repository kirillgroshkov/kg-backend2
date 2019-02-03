import { metricsAppInitHanlder } from '@src/metrics/app/handlers/metrics.app.init.handler'
import { ReqRouter } from '@src/server/req.router'

const router = new ReqRouter()
export const metricsAppResource = router.resource

router.get('/init', metricsAppInitHanlder)
