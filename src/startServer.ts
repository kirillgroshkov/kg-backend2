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
import { container, di } from '@src/container'
import { registerServices } from '@src/registerServices'
import { BootstrapSharedService, SlackSharedService } from '@naturalcycles/backend-lib'

//
// 4. Run bootstrap
//
registerServices()
const bootstrapService = di(BootstrapSharedService)

bootstrapService.startServer(bootstrapStarted).then(() => {
  const slackService: SlackSharedService = container.resolve('slackService')
  void slackService.send('kg-backend2 started', 'info')
})
