import { DatastoreMemoryService } from '@src/db/datastore/datastore.memory.service'
import { datastoreService } from '@src/services'

export function resetMemoryDatastore (): void {
  ;(datastoreService as DatastoreMemoryService).reset()
}
