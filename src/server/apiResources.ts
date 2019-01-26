import { StringMap } from '@naturalcycles/js-lib'
import { rootResource } from '@src/server/root.resource'
import { Router } from 'express'

export const API_RESOURCES: StringMap<Router> = {
  '': rootResource,
}
