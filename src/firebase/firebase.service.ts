import { memo } from '@naturalcycles/js-lib'
import { firebaseServiceAccount } from '@src/firebase/firebase.service.model'
import { SecretService } from '@src/secret/secret.service'
import * as admin from 'firebase-admin'

export class FirebaseService {
  constructor (private secretService: SecretService) {}

  admin (): typeof admin {
    return this.initAdmin(this.secretService.getSecretJson(firebaseServiceAccount))
  }

  @memo()
  private initAdmin (firebaseServiceAccount: admin.ServiceAccount): typeof admin {
    console.log('FirebaseService init...')

    admin.initializeApp({
      credential: admin.credential.cert(firebaseServiceAccount),
    })

    return admin
  }

  async verifyIdToken (idToken: string): Promise<admin.auth.DecodedIdToken> {
    return this.admin()
      .auth()
      .verifyIdToken(idToken)
  }

  async getUser (uid: string): Promise<admin.auth.UserRecord> {
    return this.admin()
      .auth()
      .getUser(uid)
  }
}
