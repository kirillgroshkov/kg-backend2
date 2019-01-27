import { memo } from '@naturalcycles/js-lib'
import { env } from '@src/env/env.service'
import { API_RESOURCES } from '@src/server/apiResources'
import { expressService } from '@src/server/express.service'
import { serverService } from '@src/server/server.service'
import { log, slackService } from '@src/services'
import { Application } from 'express'
import { Server } from 'http'

/**
 * Server bootstrapping sequence. Called from `startServer.ts`
 */
class BootstrapService {
  bootstrapStarted!: number
  app!: Application
  server!: Server
  serverStarted!: number

  /**
   * Starts the whole API server.
   */
  async startServer (bootstrapStarted: number): Promise<void> {
    this.bootstrapStarted = bootstrapStarted

    // 1. Register error handlers, etc.
    this.prepare()

    // 2. Start Express Server
    const port = parseInt(process.env.PORT!) || env().serverPort
    this.app = expressService.createApp({
      resources: API_RESOURCES,
    })
    this.server = await serverService.startServer(this.app, port)
    this.serverStarted = Date.now()

    const bootstrapTime = Date.now() - this.bootstrapStarted
    log(`serverStarted on port ${port}, bootstrapTime: ${bootstrapTime} ms`)

    // 3. Warmup
    await Promise.all([
      this.warmup(), // Eager evaluation (cache warmup, etc)
    ])

    void slackService.send('kg-backend2 started', 'info')
  }

  /**
   * Eager evaluation (cache warmup, etc)
   */
  private async warmup (): Promise<void> {
    if (env().dev) return // Speedup dev env

    // todo
  }

  /**
   * Register error handlers, etc.
   */
  private prepare (): void {
    if (!env().dev) {
      log('env: ' + env().name)
    }

    process.on('uncaughtException', err => {
      // console.log('uncaughtException: ', err)
      log.error('uncaughtException', err)
      // sentryService.captureException(err)
      if (!env().prod) {
        // throw err
      }
    })

    process.on('unhandledRejection', err => {
      // console.log('unhandledRejection: ', err)
      log.error('Unhandled rejection', err)
      // sentryService.captureException(err)
      if (!env().prod) {
        // throw err
      }
    })

    process.once('SIGINT', () => this.stopServer())
    process.once('SIGTERM', () => this.stopServer())

    // sentryService.install() // todo: new universal sentry sdk
  }

  /**
   * Gracefully shuts down the server.
   * Does `process.exit()` in the end.
   */
  @memo()
  async stopServer (): Promise<void> {
    setTimeout(() => {
      console.error('Forcefully shutting down after timeout...')
      process.exit(1)
    }, 3000)

    try {
      await Promise.all([serverService.stopServer(this.server)])

      console.info('Gracefully shut down')
      process.exit(0)
    } catch (err) {
      console.error(err)
      process.exit(1)
    }
  }
}

export const bootstrapService = new BootstrapService()
