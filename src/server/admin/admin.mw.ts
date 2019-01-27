import { staticDir } from '@src/cnst/paths.cnst'
import { env } from '@src/env/env.service'
import { requestContextService } from '@src/server/requestContext.service'
import { Req } from '@src/server/server.model'
import { RequestHandler } from 'express'
import * as fs from 'fs-extra'
import { adminService } from './admin.service'

export function adminMiddleware (urlStartsWith?: string): RequestHandler {
  return async function adminMiddlewareFn (req, res, next): Promise<void> {
    if (!env().authEnabled) return next()

    // if 'urlStartsWith' - only apply the mw to urls that start with that string
    if (urlStartsWith && !req.url.startsWith(urlStartsWith)) return next()

    const rc = (req as Req).rc || (await requestContextService.fromRequest(req))
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
