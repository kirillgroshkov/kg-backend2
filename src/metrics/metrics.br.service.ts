import { memo, PromiseMap, StringMap } from '@naturalcycles/js-lib'
import { pProps } from '@naturalcycles/promise-lib'
import { di } from '@src/container'
import { BaseDatastoreDao } from '@src/db/datastore/base.datastore.dao'
import { MetricsBackendResponseBM, MetricsBackendResponseFM } from '@src/metrics/metrics.model'

class MetricsBackendResponseService {
  async bmToFM (brBM: MetricsBackendResponseBM): Promise<MetricsBackendResponseFM> {
    // Go through all keys of BackendResponse,
    // do bmToFM on each property

    const props: PromiseMap = {}
    Object.entries(this.getBMToFMDaos()).forEach(([prop, dao]) => {
      if (brBM[prop]) props[prop] = dao.bmToFM(brBM[prop])
    })

    const brFM: MetricsBackendResponseFM = {
      ...brBM,
      ...((await pProps(props)) as any),
    }

    return brFM
  }

  /**
   * All these properties of BackendResponseBM will be transformed BM>FM via these Daos.
   * Nothing else will be transformed automatically.
   */
  @memo()
  private getBMToFMDaos (): StringMap<BaseDatastoreDao> {
    return {
      account: di('accountDao'),
    }
  }
}

export const metricsBRService = new MetricsBackendResponseService()
