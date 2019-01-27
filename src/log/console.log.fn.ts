import { BasicLogFunction, LOG_LEVEL, LogFunction } from '@src/log/log.model'
import { logService } from '@src/log/log.service'

const MAP = {
  [LOG_LEVEL.DEBUG]: 'debug',
  [LOG_LEVEL.INFO]: 'log',
  [LOG_LEVEL.WARN]: 'warn',
  [LOG_LEVEL.ERROR]: 'error',
}

const DEF = 'log'

function getBasicLogFn (): BasicLogFunction {
  return (level, ...args) => console[MAP[level] || DEF](...args)
}

export const consoleLogFn: LogFunction = logService.decorateBasicLogFunction(getBasicLogFn())
