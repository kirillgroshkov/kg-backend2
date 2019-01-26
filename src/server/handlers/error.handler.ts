import { log } from '@src/log/log.service'
import { ErrorRequestHandler } from 'express'

export function errorHandler (): ErrorRequestHandler {
  return (err, req, res, next) => {
    if (!err || res.headersSent) return next(err)
    log(`errorHandler`)

    const msg =
      (err.response || err.message || 'Something broke!') + ' (generic error in error.handler.ts)'

    // sentryService.captureException(err) // todo

    res.status(500).json({
      err: msg,
      errStack: err.stack,
      errData: err.data,
      // sentry: (res as any).sentry,
    })
  }
}
