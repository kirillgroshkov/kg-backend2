import { datastoreService } from '@src/services'

test('empty', () => {})

test.skip('test1', async () => {
  const o = {
    id: 'o123',
  }
  const o2 = await datastoreService.save('TestKind', o)
  console.log(o2)
})
