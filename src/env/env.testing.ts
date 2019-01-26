import { EnvDev } from '@src/env/env.dev'

/**
 * File is called `testing` to not match `*.test.ts` pattern
 */
export class EnvTest extends EnvDev {
  name = 'test'
}

export const _envTest = new EnvTest()
