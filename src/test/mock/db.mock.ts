import { accountDao } from '@src/services'
import { mockAccount1 } from '@src/test/mock/account.mock'

export async function mockDBState1 (): Promise<void> {
  await Promise.all([accountDao.save(mockAccount1())])
}
