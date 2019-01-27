import { BasicLogFunction, LOG_LEVEL, LogFunction } from '@src/log/log.model'

class LogService {
  /**
   * Mutates the function.
   */
  decorateBasicLogFunction (fn: BasicLogFunction): LogFunction {
    const newFn: LogFunction = ((...args: any[]) => fn(LOG_LEVEL.INFO, ...args)) as LogFunction

    return Object.assign(newFn, {
      debug: (...args: any[]) => fn(LOG_LEVEL.DEBUG, ...args),
      info: (...args: any[]) => fn(LOG_LEVEL.DEBUG, ...args),
      warn: (...args: any[]) => fn(LOG_LEVEL.DEBUG, ...args),
      error: (...args: any[]) => fn(LOG_LEVEL.DEBUG, ...args),
    }) as LogFunction
  }
}

export const logService = new LogService()
