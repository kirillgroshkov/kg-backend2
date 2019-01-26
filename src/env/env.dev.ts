import { EnvProd } from './env.prod'

export class EnvDev extends EnvProd {
  name = 'dev'
  prod = false
  dev = true

  swaggerStatsEnabled = false

  sentryDsn = undefined

  authEnabled = false
}

export const _envDev = new EnvDev()
