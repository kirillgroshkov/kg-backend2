import { resourceTestService } from '@naturalcycles/backend-lib'
import { di } from '@src/container'
import { DatastoreService } from '@src/db/datastore/datastore.service'
import { MOCK_ACCOUNT1_HEADERS, mockAccount1 } from '@src/metrics/account/account.mock'
import { MetricValueDao } from '@src/metrics/metricValue/metricValue.dao'
import { mockMetricValueInput1 } from '@src/metrics/metricValue/metricValue.mock'
import { MetricValueInput } from '@src/metrics/metricValue/metricValue.model'
import { metricValueResource } from '@src/metrics/metricValue/metricValue.resource'
import { mockDBState1 } from '@src/test/mock/db.mock'
import { CREATED_UPDATED_MATCHERS } from '@src/test/test.util'

beforeEach(async () => {
  di(DatastoreService).reset()
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
  const metricValueDao = di<MetricValueDao>('metricValueDao')
  const id = metricValueDao.naturalId(acc.id, input.metricId, input.ts)
  expect(await metricValueDao.getById(id)).toMatchSnapshot(CREATED_UPDATED_MATCHERS)
})
