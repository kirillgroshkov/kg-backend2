import { rcHandler } from '@src/server/handlers/rc.handler'
import { ReqHandler } from '@src/server/server.model'
import { RequestHandler, Router } from 'express'

export type HttpMethod = 'all' | 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head'

// https://strongloop.com/strongblog/async-error-handling-expressjs-es7-promises-generators/
// https://stackoverflow.com/a/43564267/4919972
export const reqCatchWrapper = (fn: ReqHandler): ReqHandler => async (req, res, next) => {
  try {
    await fn(req, res, next)
  } catch (err) {
    next(err)
  }
}

export const catchWrapper = (fn: RequestHandler): RequestHandler => async (req, res, next) => {
  try {
    await fn(req, res, next)
  } catch (err) {
    next(err)
  }
}

const PRE_HANDLERS: ReqHandler[] = [rcHandler]
const POST_HANDLERS: ReqHandler[] = []

export class ReqRouter {
  constructor (private defaultHanders: ReqHandler[] = []) {}

  expressRouter = Router()
  get resource (): Router {
    return this.expressRouter
  }

  route (method: HttpMethod, path: string, ..._handlers: ReqHandler[]): void {
    const handlers = [...PRE_HANDLERS, ...this.defaultHanders, ..._handlers, ...POST_HANDLERS].map(
      handler => reqCatchWrapper(handler),
    )

    this.expressRouter[method](path, ...(handlers as RequestHandler[]))
  }

  // convenience methods
  get (path: string, ...handlers: ReqHandler[]): void {
    this.route('get', path, ...handlers)
  }
  post (path: string, ...handlers: ReqHandler[]): void {
    this.route('post', path, ...handlers)
  }
  put (path: string, ...handlers: ReqHandler[]): void {
    this.route('put', path, ...handlers)
  }
  patch (path: string, ...handlers: ReqHandler[]): void {
    this.route('patch', path, ...handlers)
  }
  delete (path: string, ...handlers: ReqHandler[]): void {
    this.route('delete', path, ...handlers)
  }
  all (path: string, ...handlers: ReqHandler[]): void {
    this.route('all', path, ...handlers)
  }
}
