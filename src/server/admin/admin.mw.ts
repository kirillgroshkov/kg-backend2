import { env } from '@src/env/env.service'
import { requestContextService } from '@src/server/requestContext.service'
import { RequestHandler } from 'express'
import { adminService } from './admin.service'

export function adminMiddleware (urlStartsWith?: string): RequestHandler {
  return async function adminMiddlewareFn (req, res, next): Promise<void> {
    if (!env().authEnabled) return next()

    // if 'urlStartsWith' - only apply the mw to urls that start with that string
    if (urlStartsWith && !req.url.startsWith(urlStartsWith)) return next()

    try {
      await adminService.reqAdmin(await requestContextService.fromRequest(req))
      next()
    } catch (err) {
      return next(err)
    }
  }
}
