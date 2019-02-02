import { RequestContext } from '@src/server/requestContext'
import { Request } from 'express'

export const X_ADMIN_TOKEN = 'x-admin-token'
export const X_ACCOUNT_KEY = 'x-account-key'

class RequestContextService {
  async fromRequest (req: Request): Promise<RequestContext> {
    const rcData = this.getRequestContextData(req)
    return Object.assign(new RequestContext(), rcData)
  }

  getRequestContextData (req: Request): Partial<RequestContext> {
    return {
      adminToken: req.cookies[X_ADMIN_TOKEN],
      accountKey: req.get(X_ACCOUNT_KEY),
    }
  }
}

export const requestContextService = new RequestContextService()
