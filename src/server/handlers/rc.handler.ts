import { requestContextService } from '@src/server/requestContext.service'
import { ReqHandler } from '@src/server/server.model'

/**
 * Provides req.rc
 */
export const rcHandler: ReqHandler = async (req, res, next) => {
  req.rc = await requestContextService.fromRequest(req)
  next()
}
