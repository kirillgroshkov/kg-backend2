require('dotenv').config()
import { StringMap } from '@naturalcycles/js-lib'
import { _envDev } from '@src/env/env.dev'
import { _envProd, Env } from '@src/env/env.prod'
import { _envTest } from '@src/env/env.testing'

const ENV_MAP: StringMap<Env> = {
  prod: _envProd,
  dev: _envDev,
  test: _envTest,
}

class EnvService {
  private env?: Env

  getEnv (): Env {
    if (!this.env) {
      const appEnv = process.env.APP_ENV
      if (!appEnv) {
        throw new Error('APP_ENV should be defined!')
      }

      // detect environment
      this.env = ENV_MAP[appEnv]
      if (!this.env) {
        throw new Error(`Unsupported APP_ENV: ${appEnv}`)
      }
    }

    return this.env
  }

  init (): void {
    this.getEnv()
  }

  isGAE (): boolean {
    return !!process.env.GAE_INSTANCE
  }
}

export const envService = new EnvService()

// shortcut
export function env (): Env {
  return envService.getEnv()
}
