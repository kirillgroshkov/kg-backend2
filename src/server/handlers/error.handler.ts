import { ErrorResponse, errorSharedUtil, HttpErrorData } from '@naturalcycles/js-lib'
import { ErrorObject } from '@naturalcycles/js-lib/dist/error/error.model'
import { log } from '@src/services'
import { ErrorRequestHandler } from 'express'

export const errorHandler: ErrorRequestHandler = (_err, req, res, next) => {
  if (res.headersSent) return next(_err)
  // log(`errorHandler`)

  const err = errorSharedUtil.anyToErrorObject(_err) as ErrorObject<HttpErrorData>
  err.data = {
    httpStatusCode: 500, // default
    ...err.data,
  }

  const { path } = req

  log.error(`HTTP ${err.data.httpStatusCode} ${path} ${err.message}`)

  const resp: ErrorResponse<HttpErrorData> = {
    error: err,
  }

  res.status(err.data.httpStatusCode).json(resp)
}
