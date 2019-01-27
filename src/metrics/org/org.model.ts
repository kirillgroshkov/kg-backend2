import { objectSchema, stringSchema, unixTimestampSchema } from '@naturalcycles/nodejs-lib'
import { BaseDBEntity } from '@src/db/datastore/datastore.model'

export interface OrgBM extends BaseDBEntity {
  name: string
}

export interface OrgDBM extends OrgBM {}

export const orgBMSchema = objectSchema({
  id: stringSchema,
  created: unixTimestampSchema,
  updated: unixTimestampSchema,
  name: stringSchema,
})

export const orgDBMSchema = orgBMSchema
