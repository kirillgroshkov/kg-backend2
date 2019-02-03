import {
  idSchema,
  objectSchema,
  stringSchema,
  unixTimestampSchema,
} from '@naturalcycles/nodejs-lib'
import { BaseDBEntity } from '@src/db/datastore/datastore.model'

export interface AccountFM {
  id: string
  updated: number
  name: string
}

export interface AccountBM extends AccountFM, BaseDBEntity {
  keyHash: string
}

export interface AccountDBM extends AccountBM {}

export const accountFMSchema = objectSchema({
  id: idSchema,
  updated: unixTimestampSchema,
  name: stringSchema,
})

export const accountBMSchema = objectSchema({
  created: unixTimestampSchema,
  keyHash: stringSchema,
}).concat(accountFMSchema)

export const accountDBMSchema = accountBMSchema
