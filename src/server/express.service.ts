import { StringMap } from '@naturalcycles/js-lib'
import { env } from '@src/env/env.service'
import { errorHandler } from '@src/server/handlers/error.handler'
import { notFoundHandler } from '@src/server/handlers/notFound.handler'
import * as cookieParser from 'cookie-parser'
import * as cors from 'cors'
import { Application, Router } from 'express'
import * as express from 'express'
import * as helmet from 'helmet'

export interface ExpressServiceCfg {
  resources: StringMap<Router>
}

class ExpressService {
  createApp (cfg: ExpressServiceCfg): Application {
    const app = express()
    /*
    if (envService.isProd()) {
      // require('@google-cloud/trace-agent').start()
      // require('@google-cloud/debug-agent').start()
    }
    */

    app.disable('etag')
    app.set('trust proxy', true)

    // sentryService.addRequestHandler(app) // todo

    app.use(express.json({ limit: '1mb' }))
    app.use(express.urlencoded({ limit: '1mb', extended: true }))
    app.use(cookieParser())
    app.use(helmet())
    app.use(
      cors({
        origin: true,
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        maxAge: 86400,
      }),
    )
    app.options('*', cors()) // enable pre-flight for all requests

    // GET /swagger-stats/stats
    // GET /swagger-stats/ui
    if (env().swaggerStatsEnabled) {
      const swaggerStats = require('swagger-stats')

      const uriPath = '/swagger-stats'
      // app.use(adminMiddleware(uriPath)) // todo
      app.use(swaggerStats.getMiddleware({ uriPath }))
    }

    app.use(express.static('static'))

    // Resources
    Object.keys(cfg.resources).forEach(resourceName => {
      app.use(resourceName, cfg.resources[resourceName])
    })

    // Generic 404 handler
    app.use(notFoundHandler)

    // Generic error handler
    // It handles errors, returns proper status, does sentry.captureException()
    // It only rethrows error that happen in errorHandlerMiddleware itself ("error in errorHandler"),
    // otherwise there is no more error propagation behind it
    app.use(errorHandler())

    // Only errors that were not handled before are handled there
    // sentryService.addErrorHandler(app) // todo

    return app
  }
}

export const expressService = new ExpressService()
