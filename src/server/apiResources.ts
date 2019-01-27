import { StringMap } from '@naturalcycles/js-lib'
import { orgResource } from '@src/metrics/org/org.resource'
import { rootResource } from '@src/server/root.resource'
import { Router } from 'express'

export const API_RESOURCES: StringMap<Router> = {
  '/': rootResource,
  '/orgs': orgResource,
}
