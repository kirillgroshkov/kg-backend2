import { BaseDatastoreDao } from '@src/db/datastore/base.datastore.dao'
import { env } from '@src/env/env.service'
import {
  MetricBM,
  metricBMSchema,
  MetricDBM,
  metricDBMSchema,
} from '@src/metrics/metric/metric.model'
import { datastoreService } from '@src/services'

class MetricDao extends BaseDatastoreDao<MetricBM, MetricDBM> {
  KIND = 'Metric'
  excludeFromIndexes = []
  BACKEND_RESPONSE_PROPERTY = 'metric'
  DBM_SCHEMA = metricDBMSchema
  BM_SCHEMA = metricBMSchema
}

export const metricDao = new MetricDao(datastoreService, env().baseDaoCfg)
