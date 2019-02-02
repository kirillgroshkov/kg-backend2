import { joiValidationService } from '@naturalcycles/nodejs-lib'
import { Error400 } from '@src/error/http/error400'
import { ReqHandler } from '@src/server/server.model'
import { AnySchema } from 'joi'

export function reqValidationMiddleware (
  reqProperty: 'body' | 'params' | 'query',
  schema: AnySchema,
): ReqHandler {
  return (req, res, next) => {
    const { value, error } = joiValidationService.getValidationResult(
      req[reqProperty],
      schema,
      `req.${reqProperty}`,
    )
    if (error) {
      return next(new Error400(error.message, error.data))
    }

    // mutate req to replace the property with the value, converted by Joi
    req[reqProperty] = value
    next()
  }
}
