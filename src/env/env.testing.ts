import { EnvDev } from '@src/env/env.dev'

/**
 * File is called `testing` to not match `*.test.ts` pattern
 */
export class EnvTest extends EnvDev {
  name = 'test'

  // datastoreInMemory = false
  datastoreInMemory = true
}

export const _envTest = new EnvTest()

const { TEST_MODE } = process.env

if (TEST_MODE === 'integration') {
  // Use real remote Datastore connection
  _envTest.datastoreInMemory = false
}
