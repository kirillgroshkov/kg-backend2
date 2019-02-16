import { getRouter } from '@src/server/router'
import { accountDao } from '@src/services'

const router = getRouter()
export const accountResource = router

router.get('/', async (req, res) => {
  const accounts = await accountDao.getAll()

  res.json(accounts)
})
