export interface BaseDatastoreDaoCfg {
  throwOnEntityValidationError?: boolean
  throwOnDaoCreateObject?: boolean
}

export interface DatastoreStats {
  count: number
}

/**
 * @default All fields default to undefined
 */
export interface DaoOptions {
  skipValidation?: boolean
  throwOnError?: boolean
  preserveUpdatedCreated?: boolean
}

export interface CreatedUpdatedVer {
  created: number
  updated: number
  _ver?: number
}

export interface BaseDBEntity {
  id: string
  created: number
  updated: number
  _ver?: number
}
