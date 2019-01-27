import {
  anyObjectSchema,
  numberSchema,
  objectSchema,
  stringSchema,
  unixTimestampSchema,
} from '@naturalcycles/nodejs-lib'
import { BaseDBEntity } from '@src/db/datastore/datastore.model'

export interface MetricValueBM extends BaseDBEntity {
  /**
   * ${metricId}_${ts}
   */
  id: string
  orgId: string
  metricId: string
  ts: number
  v: number
  meta: any
  url?: string
}

export interface MetricValueDBM extends MetricValueBM {}

export const metricValueBMSchema = objectSchema({
  id: stringSchema,
  created: unixTimestampSchema,
  updated: unixTimestampSchema,
  orgId: stringSchema,
  metricId: stringSchema,
  ts: unixTimestampSchema,
  v: numberSchema,
  meta: anyObjectSchema,
  url: stringSchema.optional(),
})

export const metricValueDBMSchema = metricValueBMSchema
