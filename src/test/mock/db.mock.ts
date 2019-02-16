import { di } from '@src/container'
import { mockAccount1 } from '@src/metrics/account/account.mock'

export async function mockDBState1 (): Promise<void> {
  const accountDao = di('accountDao')
  await Promise.all([accountDao.save(mockAccount1())])
}
