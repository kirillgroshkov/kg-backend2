import { rcHandler } from '@src/server/handlers/rc.handler'
import { Router } from 'express'
import PromiseRouter from 'express-promise-router'

/**
 * Convenience method.
 */
export function getRouter (): Router {
  const router = PromiseRouter()

  // Default handlers
  router.use(rcHandler)

  return router
}
