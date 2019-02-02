import { BaseDatastoreDao } from '@src/db/datastore/base.datastore.dao'
import {
  AccountBM,
  accountBMSchema,
  AccountDBM,
  accountDBMSchema,
} from '@src/metrics/account/account.model'
import { securityService } from '@src/srv/security.service'

export class AccountDao extends BaseDatastoreDao<AccountBM, AccountDBM> {
  KIND = 'Account'
  excludeFromIndexes = []
  BACKEND_RESPONSE_PROPERTY = 'account'
  DBM_SCHEMA = accountDBMSchema
  BM_SCHEMA = accountBMSchema

  async getByAccountKey (key?: string): Promise<AccountBM | undefined> {
    if (!key) return
    const keyHash = securityService.hashPassword(key)
    return this.findOneBy('keyHash', keyHash)
  }
}
