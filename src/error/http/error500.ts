import { HTTPError, HTTPErrorData } from '@src/error/http/httpError'

/**
 * HTTP 500: Internal Server Error (generic uncategorized error)
 */
export class Error500 extends HTTPError {
  constructor (message = 'Internal Server Error', data?: HTTPErrorData) {
    super(message, {
      httpStatusCode: 500,
      ...data,
    })

    Object.defineProperty(this, 'name', {
      value: this.constructor.name,
    })

    Error.captureStackTrace(this, this.constructor)
  }
}
