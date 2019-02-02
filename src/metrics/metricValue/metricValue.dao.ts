import { BaseDatastoreDao } from '@src/db/datastore/base.datastore.dao'
import {
  MetricValueBM,
  metricValueBMSchema,
  MetricValueDBM,
  metricValueDBMSchema,
} from '@src/metrics/metricValue/metricValue.model'

export class MetricValueDao extends BaseDatastoreDao<MetricValueBM, MetricValueDBM> {
  KIND = 'MetricValue'
  excludeFromIndexes = []
  BACKEND_RESPONSE_PROPERTY = 'metricValue'
  DBM_SCHEMA = metricValueDBMSchema
  BM_SCHEMA = metricValueBMSchema

  // convenience method
  async get (accountId: string, metricId: string, ts: number): Promise<MetricValueBM | undefined> {
    return this.getById(this.naturalId(accountId, metricId, ts))
  }

  async beforeBMToDBM (bm: MetricValueBM): Promise<MetricValueDBM> {
    return {
      ...bm,
      id: this.naturalId(bm.accountId, bm.metricId, bm.ts),
    }
  }

  async beforeDBMToBM (dbm: MetricValueDBM): Promise<MetricValueBM> {
    return {
      ...dbm,
      ...this.parseNaturalId(dbm.id),
    }
  }

  naturalId (accountId: string, metricId: string, ts: number): string {
    return [accountId, metricId, ts].join('_')
  }

  parseNaturalId (id: string): { accountId: string; metricId: string; ts: number } {
    const [accountId, metricId, ts] = id.split('_')

    return {
      accountId,
      metricId,
      ts: Number(ts),
    }
  }
}
