import { orgDao } from '@src/metrics/org/org.dao'
import { ReqRouter } from '@src/server/req.router'

const router = new ReqRouter()
export const orgResource = router.resource

router.get('/', async (req, res) => {
  const orgs = await orgDao.getAll()

  res.json(orgs)
})
