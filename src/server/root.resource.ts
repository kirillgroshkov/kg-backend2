import { objectUtil } from '@naturalcycles/js-lib'
import { processSharedUtil } from '@naturalcycles/nodejs-lib'
import { bootstrapService } from '@src/bootstrap.service'
import { timeUtil } from '@src/datetime/time.util'
import { env } from '@src/env/env.service'
import { ReqRouter } from '@src/server/req.router'

const router = new ReqRouter()
export const rootResource = router.resource

router.get('/', async (req, res, next) => {
  const { serverStarted } = bootstrapService

  res.json(
    objectUtil.filterFalsyValues({
      started: `${timeUtil.timeBetween(Date.now(), serverStarted)} ago`,
      startedAtUTC: timeUtil.unixtimePretty(serverStarted / 1000),
      env: env().name,
      mem: processSharedUtil.memoryUsage(),
      cpuAvg: processSharedUtil.cpuAvg(),
      GAE_SERVICE: process.env.GAE_SERVICE,
      GAE_APPLICATION: process.env.GAE_APPLICATION,
      GAE_VERSION: process.env.GAE_VERSION,
    }),
  )
})

router.get('/cpu', async (req, res) => {
  res.json({
    cpuPercent: await processSharedUtil.cpuPercent(100),
    cpuInfo: processSharedUtil.cpuInfo(),
  })
})

router.get('/_ah/warmup', async (req, res) => {
  res.status(200).end()
})
