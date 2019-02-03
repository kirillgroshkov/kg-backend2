import {
  anyObjectSchema,
  idSchema,
  numberSchema,
  objectSchema,
  stringSchema,
  unixTimestampSchema,
} from '@naturalcycles/nodejs-lib'
import { CreatedUpdatedVer } from '@src/db/datastore/datastore.model'

export const METRIC_VALUE_FM_FIELDS: string[] = ['ts', 'v', 'meta', 'url']

export interface MetricValueFM {
  ts: number
  v: number
  meta?: any
  url?: string
}

export interface MetricValueBM extends MetricValueFM, CreatedUpdatedVer {
  accountId: string
  metricId: string
}

export interface MetricValueDBM extends MetricValueBM {
  /**
   * ${accountId}_${metricId}_${ts}
   */
  id: string
}

export const metricValueFMSchema = objectSchema({
  ts: unixTimestampSchema,
  v: numberSchema,
  meta: anyObjectSchema.optional(),
  url: stringSchema.optional(),
})

export const metricValueBMSchema = objectSchema({
  created: unixTimestampSchema,
  updated: unixTimestampSchema,
  accountId: idSchema,
  metricId: stringSchema, // slugSchema
}).concat(metricValueFMSchema)

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
  metricId: idSchema, // slugSchema
  ts: unixTimestampSchema,
  v: numberSchema,
  meta: anyObjectSchema.optional(),
  url: stringSchema.optional(),
})

export interface MetricIdObject {
  metricId: string
}

export const metricIdObjectSchema = objectSchema({
  metricId: idSchema, // slugSchema
})

export interface TSMinMaxObject {
  tsMinIncl?: number
  tsMaxExcl?: number
}

export const tsMinMaxObjectSchema = objectSchema({
  tsMinIncl: unixTimestampSchema.optional(),
  tsMaxExcl: unixTimestampSchema.optional(),
})
