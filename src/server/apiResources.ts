import { StringMap } from '@naturalcycles/js-lib'
import { accountResource } from '@src/metrics/account/account.resource'
import { metricValueResource } from '@src/metrics/metricValue/metricValue.resource'
import { rootResource } from '@src/server/root.resource'
import { Router } from 'express'

export const API_RESOURCES: StringMap<Router> = {
  '/': rootResource,
  //
  // metrics
  //
  '/metrics/accounts': accountResource,
  '/metrics/metricvalues': metricValueResource,
}
