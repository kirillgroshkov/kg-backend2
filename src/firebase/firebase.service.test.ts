import { firebaseService } from '@src/services'

test('init', async () => {
  const admin = await firebaseService.admin()
  expect(admin).not.toBeUndefined()
})

test('verifyIdToken', async () => {
  await expect(firebaseService.verifyIdToken('some invalid token')).rejects.toThrow()
})
