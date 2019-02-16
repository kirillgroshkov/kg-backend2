import { di } from '@src/container'
import { env } from '@src/env/env.service'
import { adminMiddleware } from '@src/server/admin/admin.mw'
import { AdminService } from '@src/server/admin/admin.service'
import { getRouter } from '@src/server/router'

const router = getRouter()
export const debugResource = router

router.get('/', adminMiddleware(), async (req, res) => {
  res.json({
    environment: env(),
    admin: await di(AdminService).isAdmin(req.rc),
    adminInfo: await di(AdminService).getAdminInfo(req.rc),
    cookies: req.cookies,
    // env: process.env,
  })
})

router.get('/asyncError', async () => {
  throw new Error('async error')
})
