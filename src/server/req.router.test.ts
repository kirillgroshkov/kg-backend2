import { debugResource } from '@src/server/debug.resource'
import { resourceTestService } from '@src/test/resource.test.service'

test('should handle async errors', async () => {
  const app = resourceTestService.createAppWithResource(debugResource)

  const { status } = await app.get('/asyncError')
  // console.log(status, body)
  expect(status).toBe(500)
})
