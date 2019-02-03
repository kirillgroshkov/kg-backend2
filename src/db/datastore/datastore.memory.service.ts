import { Query } from '@google-cloud/datastore/query'
import { StringMap } from '@naturalcycles/js-lib'
import { BaseDBEntity, DaoOptions } from '@src/db/datastore/datastore.model'
import { DatastoreService } from '@src/db/datastore/datastore.service'
import { LogFunction } from '@src/log/log.model'

// Kind > id > entity
type DatastoreData = StringMap<StringMap<any>>

type QueryFilterOperator = '<' | '<=' | '=' | '>=' | '>'

interface QueryFilter {
  name: string
  op: QueryFilterOperator
  val: any
}

type FilterFn = (v: any, val: any) => boolean
const FILTER_FNS: StringMap<FilterFn> = {
  '=': (v, val) => v === val,
  '<': (v, val) => v < val,
  '<=': (v, val) => v <= val,
  '>': (v, val) => v > val,
  '>=': (v, val) => v >= val,
}

/**
 * In-memory limited emulation of DatastoreService API.
 */
export class DatastoreMemoryService extends DatastoreService {
  constructor (log: LogFunction, public data: DatastoreData = {}) {
    super({ project_id: 'Memory' } as any, log)
    console.log('DatastoreMemoryService init')
  }

  /**
   * Resets InMemory DB data
   */
  reset (): void {
    this.data = {}
  }

  async getById<T = any> (kind: string, id?: string): Promise<T | undefined> {
    return id && this.data && this.data[kind] && this.data[kind][id]
  }

  async saveBatch<T = any> (
    kind: string,
    _objects: T[],
    excludeFromIndexes?: string[],
    opt: DaoOptions = {},
  ): Promise<(T & BaseDBEntity)[]> {
    const objects = _objects.map(o => this.assignIdCreatedUpdated(o, opt.preserveUpdatedCreated))
    return objects.map(obj => {
      if (!this.data[kind]) this.data[kind] = {}
      this.data[kind][obj.id] = obj

      return obj
    })
  }

  async deleteById (kind: string, id: string): Promise<void> {
    if (!this.data[kind]) this.data[kind] = {}
    delete this.data[kind][id]
  }

  async deleteBy (kind: string, by: string, value: any, limit?: number): Promise<void> {
    this.data[kind] = Object.entries(this.data[kind] || {}).filter(
      ([key, val]) => !(key === by && value === val),
    )
  }

  async runQuery<T = any> (q: Query | any, name?: string): Promise<T[]> {
    // console.log(q)
    const filter: QueryFilter = q.filters.length && q.filters[0]
    // console.log(filter)
    const kind = this.getQueryKind(q)

    let r: any[] = Object.values(this.data[kind] || [])

    if (filter) {
      r = r.filter(v => {
        const fn = FILTER_FNS[filter.op]
        if (fn) return fn(v[filter.name], filter.val)

        console.warn('query filter not supported yet: ', filter)
        return true
      })
    }

    // todo: order, limit

    return r
  }

  async countQueryRows (q: Query): Promise<number> {
    const rows = await this.runQuery(q)
    return rows.length
  }
}
