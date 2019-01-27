// import { Datastore } from '@google-cloud/datastore' // that's how it should be when typings are fixed
import Datastore = require('@google-cloud/datastore')
const { Datastore: DatastoreLib } = require('@google-cloud/datastore') // typings are not updated yet
import { DatastoreKey, DatastorePayload } from '@google-cloud/datastore/entity'
import { Query } from '@google-cloud/datastore/query'
import { memo } from '@naturalcycles/js-lib'
import { timeUtil } from '@src/datetime/time.util'
import { BaseDBEntity, DaoOptions, DatastoreStats } from '@src/db/datastore/datastore.model'
import { GCPCfg } from '@src/infra/gcp/gcp.model'
import { log } from '@src/services'
import { securityService } from '@src/srv/security.service'
import { streamUtil } from '@src/util/stream.util'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Transform } from 'stream'

/**
 * Datastore API:
 * https://googlecloudplatform.github.io/google-cloud-node/#/docs/datastore/1.0.3/datastore
 * https://cloud.google.com/datastore/docs/datastore-api-tutorial
 */
export class DatastoreService {
  constructor (private gcpCfg: GCPCfg) {}

  ds (): Datastore {
    return this.createDatastore(this.gcpCfg)
  }

  @memo()
  createDatastore (gcpCfg: GCPCfg): Datastore {
    log(`DatastoreService init (${gcpCfg.project_id})...`)

    return new DatastoreLib({
      projectId: gcpCfg.project_id, // needed
      credentials: gcpCfg,
    })
  }

  async getById<T = any> (kind: string, id?: string): Promise<T | undefined> {
    if (!id) return undefined

    const key = this.key(kind, id.toString())
    const started = Date.now()

    let r: T | undefined
    const _r = await this.ds().get(key)
    if (_r.length && _r[0]) {
      r = this.mapId(_r[0])
    }

    const millis = Date.now() - started
    log(`${kind}.getById(${id}) ${millis} ms:`, r || 'undefined')
    return r
  }

  createQuery (kind: string): Query {
    return this.ds().createQuery(kind)
  }

  /**
   * Relies on documented `.kinds` property:
   * https://cloud.google.com/nodejs/docs/reference/datastore/2.0.x/Query#kinds
   *
   * We expect it to always be defined (to be verified).
   */
  getQueryKind (_q: Query): string {
    const q: any = _q // cause typings don't know about .kinds yet :(
    return q && q.kinds && q.kinds.length && q.kinds[0]
  }

  async runQuery<T = any> (q: Query, name?: string): Promise<T[]> {
    const kind = this.getQueryKind(q)

    const started = Date.now()
    let [rows] = await this.ds().runQuery(q)

    // const info = queryResp[1]
    // console.log('queryResp: ', queryResp)
    rows = this.mapIds(rows)

    const millis = Date.now() - started
    log(`${kind}.${name || 'query'} ${millis} ms: ${rows.length} results`)
    return rows as any
  }

  runQueryStream (q: Query): NodeJS.ReadableStream {
    try {
      return (
        this.ds()
          .runQueryStream(q)
          // Important that new instance of Transform should be created every time!
          // Otherwise they share shate and affect each other
          .pipe(
            new Transform({
              objectMode: true,
              transform: (chunk, enc, callback) => {
                callback(undefined, this.mapId(chunk))
              },
            }),
          )
      )
    } catch (e) {
      const kind = this.getQueryKind(q)
      log.error(e, { kind, q, name })
      throw e
    }
  }

  streamQuery<T = any> (q: Query): Observable<T> {
    return streamUtil.streamToRx(this.runQueryStream(q))
  }

  async findBy<T = any> (kind: string, by: string, value: any, limit?: number): Promise<T[]> {
    let q = this.ds()
      .createQuery(kind)
      .filter(by, value)
    if (limit) q = q.limit(limit)

    return this.runQuery<T>(q, `findBy(${by}=${value})`)
  }

  async findOneBy<T = any> (kind: string, by: string, value: any): Promise<T | undefined> {
    const q = this.ds()
      .createQuery(kind)
      .filter(by, value)
      .limit(1)

    return this.runQuery<T>(q, `findOneBy(${by}=${value})`).then(items => {
      const one = items && items.length ? items[0] : undefined
      if (one) log(kind, 'datastore.findOneBy', one)
      return one
    })
  }

  // https://github.com/GoogleCloudPlatform/nodejs-getting-started/blob/master/2-structured-data/books/model-datastore.js

  /**
   * Returns saved entity with generated id/updated/created (non-mutating!)
   */
  async save<T> (
    kind: string,
    obj: T,
    excludeFromIndexes?: string[],
    opt: DaoOptions = {},
  ): Promise<T & BaseDBEntity> {
    const [savedObj] = await this.saveBatch(kind, [obj], excludeFromIndexes, opt)
    return savedObj
  }

  /**
   * Returns saved entities with generated id/updated/created (non-mutating!)
   */
  async saveBatch<T> (
    kind: string,
    _objects: T[],
    excludeFromIndexes?: string[],
    opt: DaoOptions = {},
  ): Promise<(T & BaseDBEntity)[]> {
    const started = Date.now()

    // Assign id/created/updated
    const objects = _objects.map(o => this.assignIdCreatedUpdated(o, opt.preserveUpdatedCreated))

    const entities = objects.map(obj => {
      const entity = this.toDatastoreEntity(kind, obj, excludeFromIndexes)
      log(`datastore.save ${kind}`, obj)
      return entity
    })

    try {
      await this.ds().save(entities)
      const millis = Date.now() - started
      const ids = objects.map(obj => obj.id)
      log(kind, `${kind}.save() ${millis} ms: ${ids.join(',')}`)
      return objects
    } catch (err) {
      // log(`datastore.save ${kind}`, { obj, entity })
      log.error('error in datastore.save! throwing', err)
      // don't throw, because datastore SDK makes it in separate thread, so exception will be unhandled otherwise
      return Promise.reject(err)
    }
  }

  async deleteById (kind: string, id?: string): Promise<void> {
    if (!id) return

    const started = Date.now()

    const key = this.key(kind, id)
    await this.deleteByKeys(key)

    const millis = Date.now() - started

    log(`${kind}.deleteById(${id}) ${millis} ms`)
  }

  async deleteByKeys (keys: DatastoreKey | DatastoreKey[]): Promise<void> {
    await this.ds().delete(keys)
  }

  async deleteBy (kind: string, by: string, value: any, limit?: number): Promise<void> {
    const entities = await this.findBy(kind, by, value, limit)
    const keys = entities.map(e => this.key(kind, e.id))
    await this.deleteByKeys(keys)
  }

  private mapIds<T> (objects: any[]): T[] {
    return objects.map(o => this.mapId(o))
  }

  mapId<T = any> (o: any, preserveKey = false): T {
    if (!o) return o
    const r = {
      ...o,
      id: this.getKey(this.getDsKey(o)!),
    }
    if (!preserveKey) delete r[DatastoreLib.KEY]
    return r
  }

  // if key field is exist on entity, it will be used as key (prevent to duplication of numeric keyed entities)
  toDatastoreEntity<T = any> (
    kind: string,
    o: T & { id?: string },
    excludeFromIndexes: string[] = [],
  ): DatastorePayload<T> {
    const key = this.getDsKey(o) || this.key(kind, o.id!.toString())
    const data = Object.assign({}, o) as any
    delete data.id
    delete data[DatastoreLib.KEY]

    return {
      key,
      data,
      excludeFromIndexes,
    }
  }

  key (kind: string, id: string): DatastoreKey {
    return this.ds().key([kind, id])
  }

  getDsKey (o: any): DatastoreKey | undefined {
    return o && o[DatastoreLib.KEY]
  }

  getKey (key: DatastoreKey): string | undefined {
    const id = key.id || key.name
    return id && id.toString()
  }

  assignIdCreatedUpdated<T> (obj: T, preserveUpdatedCreated = false): T & BaseDBEntity {
    const now = timeUtil.nowUnixtime()

    return {
      ...(obj as any),
      id: (obj as any).id || securityService.generateStringId(),
      created: (obj as any).created || (obj as any).updated || now,
      updated: preserveUpdatedCreated && (obj as any).updated ? (obj as any).updated : now,
    }
  }

  async getStats (kind: string): Promise<DatastoreStats | undefined> {
    return this.findOneBy<DatastoreStats>('__Stat_Kind__', 'kind_name', kind)
  }

  /**
   * Loads count from `__Stat_Kind__`, which is updated by Datastore once per 24h.
   */
  async getStatsCount (kind: string): Promise<number | undefined> {
    const stats = await this.getStats(kind)
    return stats && stats.count
  }

  /**
   * Runs query as "key-only" query which is faster that returning whole objects.
   */
  async queryIds (_q: Query): Promise<string[]> {
    const q = _q.select(['__key__'])
    const [rows] = await this.ds().runQuery(q)
    return this.mapIds(rows)
  }

  streamQueryIds (_q: Query): Observable<string> {
    const q = _q.select(['__key__'])
    return this.streamQuery(q).pipe(map(row => row.id))
  }

  /**
   * Modifies query to return only keys, which is faster than returning whole rows.
   * Then counts number of returned rows, returning this number.
   * This approach is non-streaming, let's see if it works good.
   */
  async countQueryRows (_q: Query): Promise<number> {
    const q = _q.select(['__key__'])
    const [rows] = await this.ds().runQuery(q)
    return rows.length
  }
}
