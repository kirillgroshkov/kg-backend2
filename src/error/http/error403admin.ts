/**
 * HTTP 403: Admin access forbidden
 */
import { Error403 } from '@src/error/http/error403'
import { HTTPErrorData } from '@src/error/http/httpError'

export class Error403Admin extends Error403 {
  constructor (message = 'Admin access forbidden', data?: HTTPErrorData) {
    super(message, data)

    Object.defineProperty(this, 'name', {
      value: this.constructor.name,
    })

    Error.captureStackTrace(this, this.constructor)
  }
}
