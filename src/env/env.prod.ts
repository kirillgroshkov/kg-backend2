import { SentrySharedServiceCfg, SlackSharedServiceCfg } from '@naturalcycles/backend-lib'
import { secretStorageDir } from '@src/cnst/paths.cnst'
import { BaseDatastoreDaoCfg } from '@src/db/datastore/datastore.model'
import { SecretServiceCfg } from '@src/secret/secret.model'

export class EnvProd {
  name = 'prod'
  prod = true
  dev = false

  serverPort = 8080

  swaggerStatsEnabled = true

  secretServiceCfg: SecretServiceCfg = {
    secretEnvName: 'PROD',
    secretFilePath: secretStorageDir + '/secrets.prod.json',
  }

  datastoreInMemory = false

  sentryServiceCfg: SentrySharedServiceCfg = {
    environment: 'prod',
    dsn: 'https://9509d46b222c449ea669e6b8d2ab76ac@sentry.io/1380359',
  }

  authEnabled = true

  slackServiceCfg: SlackSharedServiceCfg = {
    webhookUrl: 'https://hooks.slack.com/services/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',
  }

  baseDatastoreDaoCfg: BaseDatastoreDaoCfg = {
    throwOnDaoCreateObject: true,
    throwOnEntityValidationError: true,
  }

  firebaseStorageBucketName = 'test124-1621f.appspot.com'
}

export type Env = EnvProd

export const _envProd = new EnvProd()
