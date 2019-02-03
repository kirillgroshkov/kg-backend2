import { PromiseMap, StringMap } from '@naturalcycles/js-lib'
import { pProps } from '@naturalcycles/promise-lib'
import { BaseDatastoreDao } from '@src/db/datastore/base.datastore.dao'
import { MetricsBackendResponseBM, MetricsBackendResponseFM } from '@src/metrics/metrics.model'
import { accountDao } from '@src/services'

/**
 * All these properties of BackendResponseBM will be transformed BM>FM via these Daos.
 * Nothing else will be transformed automatically.
 */
const BM_TO_FM_DAOS: StringMap<BaseDatastoreDao> = {
  account: accountDao,
}

class MetricsBackendResponseService {
  async bmToFM (brBM: MetricsBackendResponseBM): Promise<MetricsBackendResponseFM> {
    // Go through all keys of BackendResponse,
    // do bmToFM on each property

    const props: PromiseMap = {}
    Object.entries(BM_TO_FM_DAOS).forEach(([prop, dao]) => {
      if (brBM[prop]) props[prop] = dao.bmToFM(brBM[prop])
    })

    const brFM: MetricsBackendResponseFM = {
      ...brBM,
      ...((await pProps(props)) as any),
    }

    return brFM
  }
}

export const metricsBRService = new MetricsBackendResponseService()
