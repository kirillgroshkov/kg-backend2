import { memo, objectUtil, StringMap } from '@naturalcycles/js-lib'
import { SecretServiceCfg } from '@src/secret/secret.model'
import { securityService } from '@src/srv/security.service'
import * as fs from 'fs-extra'
require('dotenv').config() // ensure that .env was loaded before we try to access it

export class SecretService {
  // constructor (private dep: { secretServiceCfg: SecretServiceCfg }) {} // alternative way to do DI
  constructor (private secretServiceCfg: SecretServiceCfg) {}

  /**
   * Initializes the service by loading, decrypting and preparing secrets.
   * Will throw an error if secrets are not available.
   */
  init (): void {
    this.getSecrets()
  }

  getSecrets (): StringMap {
    return this.loadSecretsFile(
      this.secretServiceCfg.secretFilePath,
      this.secretServiceCfg.secretEnvName,
    )
  }

  /**
   * Important to have a required argument for memoized function.
   * Cause @memo is shared between instances!
   */
  @memo()
  loadSecretsFile (filePath: string, secretEnvName: string): StringMap {
    if (!fs.existsSync(filePath)) {
      throw new Error(`Secret file does not exist: ${filePath}`)
    }

    const secretObj: StringMap = require(filePath)
    console.log(`secrets file ${filePath} loaded`)

    const decryptionKey = this.getRightDecryptionKey(secretObj, secretEnvName)

    return objectUtil.transformValues(secretObj, (_k, v) =>
      securityService.decryptString(v, decryptionKey),
    )
  }

  /**
   * Will try in this order:
   * 1. process.env.SECRETS_ENCRYPTION_KEY_${secretEnvName}
   * 2. process.env.SECRETS_ENCRYPTION_KEY_${secretEnvName}_B
   *
   * _B is used to support encryption key rotation, to temporarily support both keys - new and old.
   * Then new key is put as first (without _B), old key kept as _B.
   * After rotation is done _B key can be safely removed.
   *
   * Will pick the first encrypted value, try to decrypt it with first key, then second.
   * Will return the one that worked (didn't throw an error).
   */
  private getRightDecryptionKey (secretObj: StringMap, secretEnvName: string): string {
    const firstEncryptedString = Object.values(secretObj)[0]

    // Try original key (A, without _B postfix) first
    let decryptionKeyVar = `SECRETS_ENCRYPTION_KEY_${secretEnvName}`
    let decryptionKey = process.env[decryptionKeyVar]
    if (!decryptionKey) {
      throw new Error(
        `ENV variable ${decryptionKeyVar} must be defined to decrypt secrets for secretEnvName=${secretEnvName}`,
      )
    }

    try {
      securityService.decryptString(firstEncryptedString, decryptionKey)
      return decryptionKey // A key worked
    } catch (err) {
      // A key didn't work, let's try B
      try {
        decryptionKeyVar = `SECRETS_ENCRYPTION_KEY_${secretEnvName}_B`
        decryptionKey = process.env[decryptionKeyVar]!
        securityService.decryptString(firstEncryptedString, decryptionKey)
        return decryptionKey // B key worked
      } catch (err) {
        throw new Error(
          `SECRETS_ENCRYPTION_KEY (both A and B) was unable to decrypt secrets for secretEnvName=${secretEnvName}`,
        )
      }
    }
  }

  encryptString (str: string): string {
    const encryptionKeyVar = `SECRETS_ENCRYPTION_KEY_${this.secretServiceCfg.secretEnvName}`
    return securityService.encryptString(str, process.env[encryptionKeyVar]!)
  }

  decryptString (str: string): string {
    const encryptionKeyVar = `SECRETS_ENCRYPTION_KEY_${this.secretServiceCfg.secretEnvName}`
    return securityService.decryptString(str, process.env[encryptionKeyVar]!)
  }

  /**
   * You could optionally specify an environment to grab a secret on the fly
   * without impacting the whole environment.
   */
  getSecret (secretName: string): string {
    const secret = this.getSecrets()[secretName]
    if (!secret) {
      throw new Error(
        `Secret ${secretName} does not exist for ${this.secretServiceCfg.secretEnvName}!`,
      )
    }
    return secret
  }

  getSecretJson<T = any> (secretName: string): T {
    return JSON.parse(this.getSecret(secretName))
  }
}

// Convenience function
export function getSecrets (secretService: SecretService): StringMap {
  return secretService.getSecrets()
}
