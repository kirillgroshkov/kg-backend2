// Lib
import { memo } from '@naturalcycles/js-lib'
import { NodeOptions } from '@sentry/node'
import * as SentryLib from '@sentry/node'
import { log } from '@src/services'
import { ErrorRequestHandler, RequestHandler } from 'express'

export interface SentryServiceCfg extends NodeOptions {}

export class SentryService {
  constructor (public cfg: SentryServiceCfg) {}

  @memo()
  sentry (): typeof SentryLib {
    console.log('SentryService init...')

    SentryLib.init({
      dsn: this.cfg.dsn,
    })

    return SentryLib
  }

  getRequestHandler (): RequestHandler {
    return this.sentry().Handlers.requestHandler()
  }

  getErrorHandler (): ErrorRequestHandler {
    return this.sentry().Handlers.errorHandler()
  }

  /**
   * Returns "eventId"
   */
  captureException (e: any): string | undefined {
    log.error(e)
    return this.sentry().captureException(e)
  }

  /**
   * Returns "eventId"
   */
  captureMessage (msg: string): string | undefined {
    log.error(msg)
    return this.sentry().captureMessage(msg)
  }

  captureBreadcrumb (data: any): void {
    this.sentry().addBreadcrumb({
      data,
    })
  }
}
