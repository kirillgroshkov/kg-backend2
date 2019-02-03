import { BaseDatastoreDao } from '@src/db/datastore/base.datastore.dao'
import {
  MetricValueBM,
  metricValueBMSchema,
  MetricValueDBM,
  metricValueDBMSchema,
  MetricValueFM,
  metricValueFMSchema,
  TSMinMaxObject,
} from '@src/metrics/metricValue/metricValue.model'

export class MetricValueDao extends BaseDatastoreDao<MetricValueBM, MetricValueDBM, MetricValueFM> {
  KIND = 'MetricValue'
  excludeFromIndexes = []
  BACKEND_RESPONSE_PROPERTY = 'metricValue'
  DBM_SCHEMA = metricValueDBMSchema
  BM_SCHEMA = metricValueBMSchema
  FM_SCHEMA = metricValueFMSchema

  // convenience method
  async get (accountId: string, metricId: string, ts: number): Promise<MetricValueBM | undefined> {
    return this.getById(this.naturalId(accountId, metricId, ts))
  }

  async getAllMetricIdsByAccount (accountId: string): Promise<string[]> {
    const q = this.createQuery()
      .filter('accountId', accountId)
      .groupBy('metricId')
      .select(['metricId'])

    const rows = await this.runProjectionQuery(q)
    return rows.map(r => r.metricId!)
  }

  async getAllByMetricId (
    accountId: string,
    metricId: string,
    minMax: TSMinMaxObject = {},
  ): Promise<MetricValueBM[]> {
    const { tsMinIncl, tsMaxExcl } = minMax

    let q = this.createQuery()
      .filter('accountId', accountId)
      .filter('metricId', metricId)
    // .select(METRIC_VALUE_FM_FIELDS) // doesn't work without complex index :(

    if (tsMinIncl) {
      q = q.filter('ts', '>=', tsMinIncl)
    }
    if (tsMaxExcl) {
      q = q.filter('ts', '<', tsMaxExcl)
    }

    q = q.order('ts')

    return this.runQuery(q)
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
