import { di } from '@src/container'
import { DatastoreMemoryService } from '@src/db/datastore/datastore.memory.service'

export function resetMemoryDatastore (): void {
  di(DatastoreMemoryService).reset()
}
