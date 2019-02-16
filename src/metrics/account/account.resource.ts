import { di } from '@src/container'
import { AccountDao } from '@src/metrics/account/account.dao'
import { getRouter } from '@src/server/router'

const router = getRouter()
export const accountResource = router

router.get('/', async (req, res) => {
  const accounts = await di(AccountDao).getAll()

  res.json(accounts)
})
