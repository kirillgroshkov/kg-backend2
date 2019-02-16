/**
 * startServer.ts
 *
 * Only job of this file is to trigger bootstrapService.startServer()
 */

//
// 1. Log 'startServer' and record `bootstrapStarted`
//
console.log('startServer... ')
const bootstrapStarted = Date.now()

//
// 2. Imports
//
import { bootstrapService, slackService } from '@src/services'
import './typings/typings'

//
// 3. Run bootstrap
//
bootstrapService.startServer(bootstrapStarted).then(() => {
  void slackService.send('kg-backend2 started', 'info')
})
