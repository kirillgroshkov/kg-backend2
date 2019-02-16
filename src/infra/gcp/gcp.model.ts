export const gcpServiceAccount = 'gcpServiceAccount'

export interface GCPServiceAccount {
  keyFilename: string
  project_id: string
  client_email: string
  private_key: string
  [k: string]: any
}
