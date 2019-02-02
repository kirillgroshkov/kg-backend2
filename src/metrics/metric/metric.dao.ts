import { BaseDatastoreDao } from '@src/db/datastore/base.datastore.dao'
import {
  MetricBM,
  metricBMSchema,
  MetricDBM,
  metricDBMSchema,
} from '@src/metrics/metric/metric.model'

export class MetricDao extends BaseDatastoreDao<MetricBM, MetricDBM> {
  KIND = 'Metric'
  excludeFromIndexes = []
  BACKEND_RESPONSE_PROPERTY = 'metric'
  DBM_SCHEMA = metricDBMSchema
  BM_SCHEMA = metricBMSchema
}
