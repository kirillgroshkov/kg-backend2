import {
  idSchema,
  objectSchema,
  stringSchema,
  unixTimestampSchema,
} from '@naturalcycles/nodejs-lib'
import { BaseDBEntity } from '@src/db/datastore/datastore.model'

export interface MetricBM extends BaseDBEntity {
  /**
   * slug
   */
  id: string
  accountId: string
}

export interface MetricDBM extends MetricBM {}

export const metricBMSchema = objectSchema({
  id: stringSchema, // slugSchema
  created: unixTimestampSchema,
  updated: unixTimestampSchema,
  accountId: idSchema,
})

export const metricDBMSchema = metricBMSchema
