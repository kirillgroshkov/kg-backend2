import {
  idSchema,
  objectSchema,
  stringSchema,
  unixTimestampSchema,
} from '@naturalcycles/nodejs-lib'
import { BaseDBEntity } from '@src/db/datastore/datastore.model'

export interface AccountBM extends BaseDBEntity {
  name: string
  keyHash: string
}

export interface AccountDBM extends AccountBM {}

export const accountBMSchema = objectSchema({
  id: idSchema,
  created: unixTimestampSchema,
  updated: unixTimestampSchema,
  name: stringSchema,
  keyHash: stringSchema,
})

export const accountDBMSchema = accountBMSchema
