export class EnvProd {
  name = 'prod'
  prod = true
  dev = false

  serverPort = 8080

  swaggerStatsEnabled = true

  sentryDsn: string | undefined =
    'https://4434a43b3ce348fa90230c94f63bf0d5:e816e3e4964e4822a602d95c32599929@sentry.io/286298'

  authEnabled = true

  slackWebhookUrl: string | undefined =
    'https://hooks.slack.com/services/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'

  firebaseStorageBucketName = 'test124-1621f.appspot.com'
}

export type Env = EnvProd

export const _envProd = new EnvProd()
