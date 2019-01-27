/*

 This file exports instances of services.
 Initialization of services is done elsewhere.
 Assumed that all services exported here were properly initialized.

 */

import { env } from '@src/env/env.service'
import { FirebaseService } from '@src/firebase/firebase.service'
import { consoleLogFn } from '@src/log/console.log.fn'
import { LogFunction } from '@src/log/log.model'
import { SecretService } from '@src/secret/secret.service'
import { SentryService } from '@src/srv/sentry/sentry.service'

export const log: LogFunction = consoleLogFn

export const sentryService = new SentryService(env().sentryCfg)

export const secretService = new SecretService(env().secretCfg)

export const firebaseService = new FirebaseService({
  serviceAccount: secretService.getSecretJson('firebaseServiceAccount'),
})
