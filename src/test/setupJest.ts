process.env.APP_ENV = 'test'

import { silentConsoleIfRunAll } from '@naturalcycles/js-lib'
import { registerServices } from '@src/registerServices'

silentConsoleIfRunAll()

// Override default timeout (5000) for all tests
jest.setTimeout(20000)

registerServices()
