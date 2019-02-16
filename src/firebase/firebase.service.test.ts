import { di } from '@src/container'
import { FirebaseService } from '@src/firebase/firebase.service'

test('init', async () => {
  const admin = await di(FirebaseService).admin()
  expect(admin).not.toBeUndefined()
})

test('verifyIdToken', async () => {
  await expect(di(FirebaseService).verifyIdToken('some invalid token')).rejects.toThrow()
})
