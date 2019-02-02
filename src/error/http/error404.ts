import { HTTPError, HTTPErrorData } from '@src/error/http/httpError'

/**
 * HTTP 404: Not Found
 */
export class Error404 extends HTTPError {
  constructor (message = 'Not found', data?: HTTPErrorData) {
    super(message, {
      httpStatusCode: 404,
      ...data,
    })

    Object.defineProperty(this, 'name', {
      value: this.constructor.name,
    })

    Error.captureStackTrace(this, this.constructor)
  }
}
