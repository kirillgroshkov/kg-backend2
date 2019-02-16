import { staticDir } from '@src/cnst/paths.cnst'
import { di } from '@src/container'
import { env } from '@src/env/env.service'
import { AdminService } from '@src/server/admin/admin.service'
import { requestContextService } from '@src/server/requestContext.service'
import { RequestHandler } from 'express'
import * as fs from 'fs-extra'

export function adminMiddleware (urlStartsWith?: string): RequestHandler {
  return async function adminMiddlewareFn (req, res, next): Promise<void> {
    const adminService = di(AdminService)
    if (!env().authEnabled) return next()

    // if 'urlStartsWith' - only apply the mw to urls that start with that string
    if (urlStartsWith && !req.url.startsWith(urlStartsWith)) return next()

    const rc = req.rc || (await requestContextService.fromRequest(req))
    const adminToken = adminService.getAdminToken(rc)
    if (!adminToken) {
      res.status(401).send(await fs.readFile(staticDir + '/needsLogin.html', 'utf-8'))
      return
    } else {
      const email = await adminService.getEmailByToken(adminToken)
      const admin = await adminService.isEmailAdmin(email!)
      if (!admin) {
        res.status(403).send(`403 Forbidden for ${email || 'unknown email'}`)
        return
      }
    }

    next()
  }
}
