import { AccountBM } from '@src/metrics/account/account.model'
import { X_ACCOUNT_KEY } from '@src/server/requestContext.service'
import { securityService } from '@src/srv/security.service'
import { MOCK_TS } from '@src/test/mock/mock.cnst'

export const MOCK_ACCOUNT1_KEY = '123456'
export const MOCK_ACCOUNT1_KEY_HASH = securityService.hashPassword(MOCK_ACCOUNT1_KEY)
export const MOCK_ACCOUNT1_HEADERS = {
  [X_ACCOUNT_KEY]: MOCK_ACCOUNT1_KEY,
}

export function mockAccount1 (): AccountBM {
  return {
    id: 'mockorg1',
    created: MOCK_TS,
    updated: MOCK_TS,
    name: 'Org1',
    keyHash: MOCK_ACCOUNT1_KEY_HASH,
  }
}
