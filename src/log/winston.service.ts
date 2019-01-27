import { memo } from '@naturalcycles/js-lib'
import { env } from '@src/env/env.service'
import { LogFunction } from '@src/log/log.model'
import { Logger } from 'winston'
import * as winston from 'winston'

class WinstonService {
  @memo()
  getLogger (): Logger {
    console.log('WinstonService init...')

    const transports = [new winston.transports.Console()]

    if (env().prod) {
      // Require and add Stackdriver logging only when run in GAE
      const { LoggingWinston } = require('@google-cloud/logging-winston')
      transports.push(new LoggingWinston())
    }

    const logger = winston.createLogger({
      level: 'info',
      transports,
    })

    return logger
  }

  /**
   * Returns LogFunction made from Winston API.
   */
  getLogFunction (): LogFunction {
    // todo: I got stuck here on how to transform console.log() API into Winston 3 API...

    const logger = this.getLogger()

    const logFn = ((...args: any[]) => {
      args.forEach(arg => {
        // logger.log('info', '%o', arg)
        logger.log('info', arg)
      })
      // logger.log('info', {a: 'f'})
      // logger.info({a: 'sdf'})

      // logger.log('info', '%o', ...args) // or
    }) as LogFunction

    return logFn
  }
}

export const winstonService = new WinstonService()
