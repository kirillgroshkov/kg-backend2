import { requestContextService } from '@src/server/requestContext.service'
import { RequestHandler } from 'express'

/**
 * Provides req.rc
 */
export const rcHandler: RequestHandler = async (req, res, next) => {
  req.rc = await requestContextService.fromRequest(req)
  next()
}
