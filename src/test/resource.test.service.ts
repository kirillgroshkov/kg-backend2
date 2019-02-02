import { createApp } from '@src/server/express.app'
import { Router } from 'express'
import * as request from 'supertest'

class ResourceTestService {
  createAppWithResource (resource: Router): request.SuperTest<request.Test> {
    const app = createApp({
      '/': resource,
    })
    return request(app)
  }
}

export const resourceTestService = new ResourceTestService()
