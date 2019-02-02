import { HTTPError, HTTPErrorData } from '@src/error/http/httpError'

/**
 * HTTP 400: Bad Request
 */
export class Error400 extends HTTPError {
  constructor (message = 'Bad Request', data?: HTTPErrorData) {
    super(message, {
      httpStatusCode: 400,
      ...data,
    })

    Object.defineProperty(this, 'name', {
      value: this.constructor.name,
    })

    Error.captureStackTrace(this, this.constructor)
  }
}
