import { HTTPError, HTTPErrorData } from '@src/error/http/httpError'

/**
 * HTTP 403: Forbidden
 */
export class Error403 extends HTTPError {
  constructor (message = 'Forbidden', data?: HTTPErrorData) {
    super(message, {
      httpStatusCode: 403,
      ...data,
    })

    Object.defineProperty(this, 'name', {
      value: this.constructor.name,
    })

    Error.captureStackTrace(this, this.constructor)
  }
}
