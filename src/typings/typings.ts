import { RequestContext } from '@src/server/requestContext'

declare global {
  namespace Express {
    interface Request {
      rc: RequestContext
    }
  }
}
