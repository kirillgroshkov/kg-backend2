import { HTTPError, HTTPErrorData } from '@src/error/http/httpError'

/**
 * HTTP 401: Unauthorized
 */
export class Error401 extends HTTPError {
  constructor (message = 'Unauthorized', data?: HTTPErrorData) {
    super(message, {
      httpStatusCode: 401,
      ...data,
    })

    Object.defineProperty(this, 'name', {
      value: this.constructor.name,
    })

    Error.captureStackTrace(this, this.constructor)
  }
}
