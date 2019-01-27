import { RequestContext } from '@src/server/requestContext'
import { Request } from 'express'

class RequestContextService {
  async fromRequest (req: Request): Promise<RequestContext> {
    const rcData = this.getRequestContextData(req)
    return Object.assign(new RequestContext(), rcData)
  }

  getRequestContextData (req: Request): Partial<RequestContext> {
    return {
      adminToken: req.cookies['kg_admin_token'],
    }
  }
}

export const requestContextService = new RequestContextService()
