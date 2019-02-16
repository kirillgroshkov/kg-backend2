import { SlackSharedServiceCfg } from '@naturalcycles/backend-lib'
import { EnvProd } from './env.prod'

export class EnvDev extends EnvProd {
  name = 'dev'
  prod = false
  dev = true

  swaggerStatsEnabled = false

  sentryServiceCfg = {
    // dsn: undefined,
  }

  authEnabled = false

  slackServiceCfg: SlackSharedServiceCfg = {
    // webhookUrl: undefined
  }
}

export const _envDev = new EnvDev()
