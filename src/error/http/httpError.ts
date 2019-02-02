import { AppError, ErrorData } from '@naturalcycles/js-lib'

export interface HTTPErrorData extends ErrorData {
  /**
   * @default 500
   */
  httpStatusCode?: number
}

/**
 * Base class for HTTP errors - errors that define HTTP error code.
 */
export class HTTPError extends AppError {
  constructor (message?: string, public data?: HTTPErrorData) {
    super(message, data)

    Object.defineProperty(this, 'name', {
      value: this.constructor.name,
    })

    Error.captureStackTrace(this, this.constructor)
  }
}
