import { BaseDatastoreDao } from '@src/db/datastore/base.datastore.dao'
import { env } from '@src/env/env.service'
import { OrgBM, orgBMSchema, OrgDBM, orgDBMSchema } from '@src/metrics/org/org.model'
import { datastoreService } from '@src/services'

class OrgDao extends BaseDatastoreDao<OrgBM, OrgDBM> {
  KIND = 'Org'
  excludeFromIndexes = []
  BACKEND_RESPONSE_PROPERTY = 'org'
  DBM_SCHEMA = orgDBMSchema
  BM_SCHEMA = orgBMSchema
}

export const orgDao = new OrgDao(datastoreService, env().baseDaoCfg)
