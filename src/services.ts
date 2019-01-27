/*

 This file exports instances of services.
 Initialization of services is done elsewhere.
 Assumed that all services exported here were properly initialized.

 */

import { DatastoreService } from '@src/db/datastore/datastore.service'
import { env } from '@src/env/env.service'
import { FirebaseService } from '@src/firebase/firebase.service'
import { GCPCfg } from '@src/infra/gcp/gcp.model'
import { consoleLogFn } from '@src/log/console.log.fn'
import { LogFunction } from '@src/log/log.model'
import { SecretService } from '@src/secret/secret.service'
import { SentryService } from '@src/srv/sentry/sentry.service'
import { SlackService } from '@src/srv/slack.service'

export const log: LogFunction = consoleLogFn

export const sentryService = new SentryService(env().sentryCfg)

export const secretService = new SecretService(env().secretCfg)

export const firebaseService = new FirebaseService({
  serviceAccount: secretService.getSecretJson('firebaseServiceAccount'),
})

export const slackService = new SlackService(env().slackCfg)

const gcpServiceAccount: GCPCfg = secretService.getSecretJson('gcpServiceAccount')

export const datastoreService = new DatastoreService(gcpServiceAccount)
