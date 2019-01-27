import { SlackServiceCfg } from '@src/srv/slack.service'
import { EnvProd } from './env.prod'

export class EnvDev extends EnvProd {
  name = 'dev'
  prod = false
  dev = true

  swaggerStatsEnabled = false

  sentryCfg = {
    // dsn: undefined,
  }

  authEnabled = false

  slackCfg: SlackServiceCfg = {
    // webhookUrl: undefined
  }
}

export const _envDev = new EnvDev()
