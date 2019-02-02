import { ReqRouter } from '@src/server/req.router'
import { accountDao } from '@src/services'

const router = new ReqRouter()
export const accountResource = router.resource

router.get('/', async (req, res) => {
  const accounts = await accountDao.getAll()

  res.json(accounts)
})
