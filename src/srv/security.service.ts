import { memo } from '@naturalcycles/js-lib'
import * as crypto from 'crypto'

class SecurityService {
  md5 (s: string): string {
    return crypto
      .createHash('md5')
      .update(s)
      .digest('hex')
  }

  base64 (s: string): string {
    return Buffer.from(s, 'utf8').toString('base64')
  }

  decodeBase64 (b64string: string): string {
    return Buffer.from(b64string, 'base64').toString('utf8')
  }

  @memo()
  private getCryptoParams (secretKey: string): { algorithm: string; key: string; iv: string } {
    const algorithm = 'aes-256-cbc'
    const key = this.md5(secretKey)
    const iv = this.md5(secretKey + key).slice(0, 16)
    return { algorithm, key, iv }
  }

  private getDecipher (secretKey: string): crypto.Decipher {
    const { algorithm, key, iv } = this.getCryptoParams(secretKey)
    return crypto.createDecipheriv(algorithm, key, iv)
  }

  private getCipher (secretKey: string): crypto.Cipher {
    const { algorithm, key, iv } = this.getCryptoParams(secretKey)
    return crypto.createCipheriv(algorithm, key, iv)
  }

  decryptString (str: string, secretKey: string): string {
    if (!secretKey) throw new Error('secretKey is missing')
    const decipher = this.getDecipher(secretKey)
    let decrypted = decipher.update(str, 'base64', 'utf8')
    return (decrypted += decipher.final('utf8'))
  }

  encryptString (str: string, secretKey: string): string {
    if (!secretKey) throw new Error('secretKey is missing')
    const cipher = this.getCipher(secretKey)
    let encrypted = cipher.update(str, 'utf8', 'base64')
    return (encrypted += cipher.final('base64'))
  }
}

export const securityService = new SecurityService()
