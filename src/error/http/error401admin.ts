import { Error401 } from '@src/error/http/error401'
import { HTTPErrorData } from '@src/error/http/httpError'
/**
 * HTTP 401: Admin authorization required
 */
export class Error401Admin extends Error401 {
  constructor (message = 'Admin authorization required', data?: HTTPErrorData) {
    super(message, data)

    Object.defineProperty(this, 'name', {
      value: this.constructor.name,
    })

    Error.captureStackTrace(this, this.constructor)
  }
}
