import { env } from '@src/env/env.service'
import { adminMiddleware } from '@src/server/admin/admin.mw'
import { adminService } from '@src/server/admin/admin.service'
import { ReqRouter } from '@src/server/req.router'

const router = new ReqRouter()
export const debugResource = router.resource

router.get('/', adminMiddleware(), async (req, res) => {
  res.json({
    environment: env(),
    admin: await adminService.isAdmin(req.rc),
    adminInfo: await adminService.getAdminInfo(req.rc),
    cookies: req.cookies,
    // env: process.env,
  })
})

router.get('/asyncError', async () => {
  throw new Error('async error')
})
