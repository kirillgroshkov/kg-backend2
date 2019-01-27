import { objectSchema, stringSchema, unixTimestampSchema } from '@naturalcycles/nodejs-lib'
import { BaseDBEntity } from '@src/db/datastore/datastore.model'

export interface MetricBM extends BaseDBEntity {
  /**
   * slug
   */
  id: string
  orgId: string
}

export interface MetricDBM extends MetricBM {}

export const metricBMSchema = objectSchema({
  id: stringSchema,
  created: unixTimestampSchema,
  updated: unixTimestampSchema,
  orgId: stringSchema,
})

export const metricDBMSchema = metricBMSchema
