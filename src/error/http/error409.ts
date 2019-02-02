import { HTTPError, HTTPErrorData } from '@src/error/http/httpError'

/**
 * HTTP 409: Conflict
 */
export class Error409 extends HTTPError {
  constructor (message = 'Conflict', data?: HTTPErrorData) {
    super(message, {
      httpStatusCode: 409,
      ...data,
    })

    Object.defineProperty(this, 'name', {
      value: this.constructor.name,
    })

    Error.captureStackTrace(this, this.constructor)
  }
}
