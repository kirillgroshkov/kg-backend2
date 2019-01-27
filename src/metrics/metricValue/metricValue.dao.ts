import { BaseDatastoreDao } from '@src/db/datastore/base.datastore.dao'
import { env } from '@src/env/env.service'
import {
  MetricValueBM,
  metricValueBMSchema,
  MetricValueDBM,
  metricValueDBMSchema,
} from '@src/metrics/metricValue/metricValue.model'
import { datastoreService } from '@src/services'

class MetricValueDao extends BaseDatastoreDao<MetricValueBM, MetricValueDBM> {
  KIND = 'MetricValue'
  excludeFromIndexes = []
  BACKEND_RESPONSE_PROPERTY = 'metricValue'
  DBM_SCHEMA = metricValueDBMSchema
  BM_SCHEMA = metricValueBMSchema
}

export const metricValueDao = new MetricValueDao(datastoreService, env().baseDaoCfg)
