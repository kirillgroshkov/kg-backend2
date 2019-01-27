import { memo } from '@naturalcycles/js-lib'
import { log } from '@src/services'
import * as admin from 'firebase-admin'

export interface FirebaseServiceCfg {
  serviceAccount: admin.ServiceAccount
}

export class FirebaseService {
  constructor (private cfg: FirebaseServiceCfg) {}

  admin (): typeof admin {
    return this.initAdmin(this.cfg)
  }

  @memo()
  private initAdmin (cfg: FirebaseServiceCfg): typeof admin {
    log('FirebaseService init...')

    admin.initializeApp({
      credential: admin.credential.cert(cfg.serviceAccount),
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
