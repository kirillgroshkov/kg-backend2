import { createdUpdatedFields } from '@src/db/model.util'
import { orgDao } from '@src/metrics/org/org.dao'
import { OrgBM } from '@src/metrics/org/org.model'

test('empty', () => {})

test.skip('test1', async () => {
  let org: OrgBM = {
    id: 'orgid1',
    name: 'Org name one',
    ...createdUpdatedFields(),
  }

  org = await orgDao.save(org)
  console.log(org)
})
