import { FirebaseService } from '@src/firebase/firebase.service'
import { RequestContext } from '@src/server/requestContext'

const ADMIN_SET = new Set<string>(['ceo@inventix.ru'])

export class AdminService {
  constructor (private firebaseService: FirebaseService) {}

  isEmailAdmin (email: string): boolean {
    return ADMIN_SET.has(email)
  }

  async getEmailByToken (idToken?: string): Promise<string | undefined> {
    if (!idToken) return undefined

    try {
      const t = await this.firebaseService.verifyIdToken(idToken)
      const email = t && t.email
      console.log('admin: ' + email)
      return email
    } catch (err) {
      console.log('firebaseService.getEmailByToken error', (err || {}).message)
      return undefined
    }
  }

  async isTokenAdmin (idToken: string): Promise<boolean> {
    const email = await this.getEmailByToken(idToken)
    if (!email) return false

    return this.isEmailAdmin(email)
  }

  getAdminToken (rc: RequestContext): string | undefined {
    return rc.adminToken
  }

  async isAdmin (rc: RequestContext): Promise<boolean> {
    if (!rc.adminToken) return false

    return this.isTokenAdmin(rc.adminToken)
  }

  async reqAdmin (rc: RequestContext): Promise<void> {
    const email = await this.getEmailByToken(rc.adminToken)
    // if (!email) throw new Error401Admin()
    if (!email) throw new Error('401 Unauthorized (admin access required)')

    const admin = await this.isEmailAdmin(email)
    // if (!admin) throw new Error403Admin()
    if (!admin) throw new Error('403 Forbidden (admin permission required)')
  }

  async getAdminInfo (rc: RequestContext): Promise<any> {
    const email = await this.getEmailByToken(rc.adminToken)
    if (!email) return

    const admin = await this.isEmailAdmin(email)
    if (!admin) return

    return {
      email,
    }
  }
}
