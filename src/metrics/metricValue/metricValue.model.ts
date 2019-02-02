import {
  anyObjectSchema,
  idSchema,
  numberSchema,
  objectSchema,
  stringSchema,
  unixTimestampSchema,
} from '@naturalcycles/nodejs-lib'
import { CreatedUpdatedVer } from '@src/db/datastore/datastore.model'

export interface MetricValueBM extends CreatedUpdatedVer {
  accountId: string
  metricId: string
  ts: number
  v: number
  meta?: any
  url?: string
}

export interface MetricValueDBM extends MetricValueBM {
  /**
   * ${accountId}_${metricId}_${ts}
   */
  id: string
}

export const metricValueBMSchema = objectSchema({
  created: unixTimestampSchema,
  updated: unixTimestampSchema,
  accountId: idSchema,
  metricId: stringSchema, // slugSchema
  ts: unixTimestampSchema,
  v: numberSchema,
  meta: anyObjectSchema.optional(),
  url: stringSchema.optional(),
})

export const metricValueDBMSchema = metricValueBMSchema.concat(
  objectSchema({
    id: stringSchema,
  }),
)

export interface MetricValueInput {
  metricId: string
  ts: number
  v: number
  meta?: any
  url?: string
}

export const metricValueInputSchema = objectSchema({
  metricId: idSchema,
  ts: unixTimestampSchema,
  v: numberSchema,
  meta: anyObjectSchema.optional(),
  url: stringSchema.optional(),
})
