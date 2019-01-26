process.env.APP_ENV = 'test'

import { silentConsoleIfRunAll } from '@naturalcycles/js-lib'

silentConsoleIfRunAll()

// Override default timeout (5000) for all tests
jest.setTimeout(20000)
