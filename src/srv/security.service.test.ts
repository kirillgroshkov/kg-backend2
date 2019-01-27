import { securityService } from '@src/srv/security.service'

test('decodeBase64', () => {
  const s = 'abcsdf123'
  const b64 = securityService.base64(s)
  const s2 = securityService.decodeBase64(b64)
  console.log(s2)
})
