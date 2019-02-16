import { BootstrapSharedService } from '@naturalcycles/backend-lib'
import { di } from '@src/container'
import { DatastoreService } from '@src/db/datastore/datastore.service'

test('registerServices', async () => {
  // registerServices()
  // const bootstrapService: BootstrapSharedService = container.resolve('bootstrapService')
  // const bootstrapService: BootstrapSharedService = di('bootstrapService')
  const bootstrapService = di(BootstrapSharedService)
  // console.log('hello', bootstrapService)
  expect(bootstrapService).toBeDefined()

  // console.log(di('datastoreService'))
  console.log(di(DatastoreService))
  // console.log(di('secrets'))
})
