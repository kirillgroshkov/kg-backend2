import { firebaseServiceAccount } from '@src/firebase/firebase.service.model'
import { gcpServiceAccount } from '@src/infra/gcp/gcp.model'

export interface SecretServiceCfg {
  /**
   * Absolute path to json file with secrets.
   */
  secretFilePath: string

  /**
   * Name of the secret environment, e.g `prod`.
   * Used to determine decryption key.
   */
  secretEnvName: string
}

export interface AppSecrets {
  [firebaseServiceAccount]: string
  [gcpServiceAccount]: string
}
