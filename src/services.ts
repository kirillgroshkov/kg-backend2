/*

 This file exports instances of services.
 Initialization of services is done elsewhere.
 Assumed that all services exported here were properly initialized.

 */

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
import { SentryService } from '@src/srv/sentry/sentry.service'
import { SlackService } from '@src/srv/slack.service'

const _env = env()

export const log: LogFunction = consoleLogFn

export const sentryService = new SentryService(_env.sentryCfg)

export const secretService = new SecretService(_env.secretCfg)

export const firebaseService = new FirebaseService({
  serviceAccount: secretService.getSecretJson('firebaseServiceAccount'),
})

export const slackService = new SlackService(_env.slackCfg)

const gcpServiceAccount: GCPCfg = secretService.getSecretJson('gcpServiceAccount')

export const datastoreService = _env.datastoreInMemory
  ? new DatastoreMemoryService(log)
  : new DatastoreService(gcpServiceAccount, log)

export const accountDao = new AccountDao(datastoreService, _env.baseDaoCfg)
export const metricDao = new MetricDao(datastoreService, _env.baseDaoCfg)
export const metricValueDao = new MetricValueDao(datastoreService, _env.baseDaoCfg)
