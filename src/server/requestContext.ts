import { Error401 } from '@naturalcycles/backend-lib'
import { di } from '@src/container'
import { AccountDao } from '@src/metrics/account/account.dao'
import { AccountBM } from '@src/metrics/account/account.model'

/**
 * To be used in services instead of Express.Request.
 * To decouple business logic from Express.
 * To allow to safely log this object or pass over the wire (e.g in MQ).
 * Because Express.Request is dangerous to console.log() or serialize in other way.
 */
export class RequestContext {
  adminToken?: string
  accountKey?: string

  private cachedAccount?: Promise<AccountBM | undefined>

  async getAccount (): Promise<AccountBM | undefined> {
    const accountDao = di<AccountDao>('accountDao')
    return (this.cachedAccount = this.cachedAccount || accountDao.getByAccountKey(this.accountKey))
  }

  /**
   * For testing mostly
   */
  setAccount (acc?: AccountBM): this {
    this.cachedAccount = Promise.resolve(acc)
    return this
  }

  async requireAccount (): Promise<AccountBM> {
    const acc = await this.getAccount()
    if (!acc) throw new Error401()
    return acc
  }
}
