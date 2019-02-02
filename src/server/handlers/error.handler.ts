import { log } from '@src/services'
import { ErrorRequestHandler } from 'express'

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (!err || res.headersSent) return next(err)
  // log(`errorHandler`)

  const msg = err.message || 'Error message not defined'

  // sentryService.captureException(err) // todo

  const statusCode = (err.data && err.data.httpStatusCode) || 500

  const { path } = req

  log(`HTTP ${statusCode} ${path} ${msg}`)

  res.status(statusCode).json({
    err: msg,
    errStack: err.stack,
    errData: err.data,
    sentryErrorId: (res as any).sentry,
  })
}
