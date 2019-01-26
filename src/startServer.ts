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
import { bootstrapService } from '@src/bootstrap.service'
import '@src/polyfills'

//
// 3. Run bootstrap
//
void bootstrapService.startServer(bootstrapStarted)
