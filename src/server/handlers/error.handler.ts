import { log } from '@src/services'
import { ErrorRequestHandler } from 'express'

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (!err || res.headersSent) return next(err)
  log(`errorHandler`)

  const msg =
    (err.response || err.message || 'Something broke!') + ' (generic error in error.handler.ts)'

  // sentryService.captureException(err) // todo

  res.status(500).json({
    err: msg,
    errStack: err.stack,
    errData: err.data,
    sentryErrorId: (res as any).sentry,
  })
}
