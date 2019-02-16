/**
 * startServer.ts
 *
 * Only job of this file is to trigger bootstrapService.startServer()
 */
/* tslint:disable:ordered-imports */

//
// 1. Log 'startServer' and record `bootstrapStarted`
//
console.log('startServer... ')
const bootstrapStarted = Date.now()

//
// 2. Imports
// These imports should be always on top
//
import './typings/typings'

//
// 3. Further imports
//
import { di } from '@src/container'
import { registerServices } from '@src/registerServices'
import { BootstrapSharedService, SlackSharedService } from '@naturalcycles/backend-lib'

//
// 4. Run bootstrap
//
registerServices()

di(BootstrapSharedService)
  .startServer(bootstrapStarted)
  .then(() => {
    void di(SlackSharedService).send('kg-backend2 started', 'info')
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
