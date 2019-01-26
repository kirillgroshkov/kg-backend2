import { env } from '@src/env/env.service'

test('correct env is setup for tests', async () => {
  const e = env()
  console.log(e)
  expect(e.name).toBe('test')
})
