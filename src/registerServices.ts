/*
Here we register all Services into the Container.
We import EVERYTHING (API_RESOURCES, etc, etc).
We export NOTHING from here.
To get instance of service:
container.resolve<ServiceClass>('serviceName')
OR
import { serviceName } from '@src/di'
 */

import {
  BootstrapSharedServiceCfg,
  createDefaultApp,
  SentrySharedService,
  SlackSharedService,
} from '@naturalcycles/backend-lib'
import { DefaultAppCfg } from '@naturalcycles/backend-lib/dist/server/createDefaultApp.model'
import { ClassType } from '@naturalcycles/js-lib'
import { container, registerClass } from '@src/container'
import { DatastoreMemoryService } from '@src/db/datastore/datastore.memory.service'
import { DatastoreService } from '@src/db/datastore/datastore.service'
import { Env } from '@src/env/env.prod'
import { env } from '@src/env/env.service'
import { FirebaseService } from '@src/firebase/firebase.service'
import { AccountDao } from '@src/metrics/account/account.dao'
import { MetricValueDao } from '@src/metrics/metricValue/metricValue.dao'
import { getSecrets, SecretService } from '@src/secret/secret.service'
import { AdminService } from '@src/server/admin/admin.service'
import { API_RESOURCES } from '@src/server/apiResources'
import { asFunction, asValue } from 'awilix'

export function registerServices (): void {
  const _env = env()

  const classes: ClassType[] = [
    SecretService,
    SentrySharedService,
    FirebaseService,
    SlackSharedService,
    AdminService,
    AccountDao,
    MetricValueDao,
    _env.datastoreInMemory ? DatastoreMemoryService : DatastoreService,
  ]

  const envValues: (keyof Env)[] = [
    'secretServiceCfg',
    'sentryServiceCfg',
    'slackServiceCfg',
    'baseDatastoreDaoCfg',
  ]

  //
  // 1. Services for both prod and test
  //
  container.register({
    secrets: asFunction(getSecrets).singleton(),

    defaultAppCfg: asValue<DefaultAppCfg>({
      swaggerStatsEnabled: _env.swaggerStatsEnabled,
      resources: API_RESOURCES,
    }),
    expressApp: asFunction(createDefaultApp).singleton(),
    bootstrapServiceCfg: asValue<BootstrapSharedServiceCfg>({
      port: _env.serverPort,
    }),
  })

  // Register all env values
  envValues.forEach(key => {
    container.register(key, asValue(_env[key]))
  })

  // Register all classes
  classes.forEach(c => registerClass(c))
}
