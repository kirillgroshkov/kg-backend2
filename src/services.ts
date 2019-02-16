/*

 This file exports instances of services.
 Initialization of services is done elsewhere.
 Assumed that all services exported here were properly initialized.

 */

import {
  BootstrapSharedService,
  createDefaultApp,
  SentrySharedService,
  SlackSharedService,
} from '@naturalcycles/backend-lib'
import { DatastoreMemoryService } from '@src/db/datastore/datastore.memory.service'
import { DatastoreService } from '@src/db/datastore/datastore.service'
import { env } from '@src/env/env.service'
import { FirebaseService } from '@src/firebase/firebase.service'
import { GCPCfg } from '@src/infra/gcp/gcp.model'
import { consoleLogFn } from '@src/log/console.log.fn'
import { LogFunction } from '@src/log/log.model'
import { AccountDao } from '@src/metrics/account/account.dao'
import { MetricDao } from '@src/metrics/metric/metric.dao'
import { MetricValueDao } from '@src/metrics/metricValue/metricValue.dao'
import { SecretService } from '@src/secret/secret.service'
import { API_RESOURCES } from '@src/server/apiResources'

const _env = env()

export const log: LogFunction = consoleLogFn

export const secretService = new SecretService(_env.secretCfg)

export const sentryService = new SentrySharedService(_env.sentryCfg)

export const app = createDefaultApp({
  swaggerStatsEnabled: _env.swaggerStatsEnabled,
  sentryService,
  resources: API_RESOURCES,
})

export const bootstrapService = new BootstrapSharedService({
  port: _env.serverPort,
  app,
})

export const firebaseService = new FirebaseService({
  serviceAccount: secretService.getSecretJson('firebaseServiceAccount'),
})

export const slackService = new SlackSharedService(_env.slackCfg)

const gcpServiceAccount: GCPCfg = secretService.getSecretJson('gcpServiceAccount')

export const datastoreService = _env.datastoreInMemory
  ? new DatastoreMemoryService(log)
  : new DatastoreService(gcpServiceAccount, log)

export const accountDao = new AccountDao(datastoreService, _env.baseDaoCfg)
export const metricDao = new MetricDao(datastoreService, _env.baseDaoCfg)
export const metricValueDao = new MetricValueDao(datastoreService, _env.baseDaoCfg)
