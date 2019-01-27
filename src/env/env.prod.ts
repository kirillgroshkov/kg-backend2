import { secretStorageDir } from '@src/cnst/paths.cnst'
import { BaseDatastoreDaoCfg } from '@src/db/datastore/base.datastore.dao'
import { SecretServiceCfg } from '@src/secret/secret.service'
import { SentryServiceCfg } from '@src/srv/sentry/sentry.service'
import { SlackServiceCfg } from '@src/srv/slack.service'

export class EnvProd {
  name = 'prod'
  prod = true
  dev = false

  serverPort = 8080

  swaggerStatsEnabled = true

  secretCfg: SecretServiceCfg = {
    secretEnvName: 'PROD',
    secretFilePath: secretStorageDir + '/secrets.prod.json',
  }

  sentryCfg: SentryServiceCfg = {
    environment: 'prod',
    dsn: 'https://9509d46b222c449ea669e6b8d2ab76ac@sentry.io/1380359',
  }

  authEnabled = true

  slackCfg: SlackServiceCfg = {
    webhookUrl: 'https://hooks.slack.com/services/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',
  }

  baseDaoCfg: BaseDatastoreDaoCfg = {
    throwOnDaoCreateObject: true,
    throwOnEntityValidationError: true,
  }

  firebaseStorageBucketName = 'test124-1621f.appspot.com'
}

export type Env = EnvProd

export const _envProd = new EnvProd()
