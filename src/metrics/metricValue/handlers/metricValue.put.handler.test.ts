import { MetricValueInput } from '@src/metrics/metricValue/metricValue.model'
import { metricValueResource } from '@src/metrics/metricValue/metricValue.resource'
import { metricValueDao } from '@src/services'
import { MOCK_ACCOUNT1_HEADERS, mockAccount1 } from '@src/test/mock/account.mock'
import { mockDBState1 } from '@src/test/mock/db.mock'
import { mockMetricValueInput1 } from '@src/test/mock/metricValue.mock'
import { resourceTestService } from '@src/test/resource.test.service'
import { CREATED_UPDATED_MATCHERS } from '@src/test/test.util'

beforeAll(async () => {
  await mockDBState1()
})

const app = resourceTestService.createAppWithResource(metricValueResource)
const request = (input: MetricValueInput) =>
  app
    .put('/')
    .send(input)
    .set(MOCK_ACCOUNT1_HEADERS)

test('PUT /metricvalues', async () => {
  const input = mockMetricValueInput1()
  const acc = mockAccount1()

  const { body, status } = await request(input)
  console.log(status)
  console.log(body)

  expect(status).toBe(201)
  expect(body).toEqual({})

  // Should save to DB
  const id = metricValueDao.naturalId(acc.id, input.metricId, input.ts)
  expect(await metricValueDao.getById(id)).toMatchSnapshot(CREATED_UPDATED_MATCHERS)
})
