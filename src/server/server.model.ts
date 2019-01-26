import { RequestContext } from '@src/server/requestContext'
import { NextFunction, Request, Response } from 'express'

/**
 * Express Request with `rc` as RequestContext.
 */
export interface Req extends Request {
  rc: RequestContext
}

/**
 * ReqHandler is compatible with stock express' RequestHandler,
 * but has `Req` - extended Request interface.
 */
export type ReqHandler = (req: Req, res: Response, next: NextFunction) => void
