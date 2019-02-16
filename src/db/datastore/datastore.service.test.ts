import { di } from '@src/container'
import { DatastoreService } from '@src/db/datastore/datastore.service'

test('empty', () => {})

test.skip('test1', async () => {
  const o = {
    id: 'o123',
  }
  const o2 = await di(DatastoreService).save('TestKind', o)
  console.log(o2)
})
