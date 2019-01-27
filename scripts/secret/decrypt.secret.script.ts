/*

yarn tsn ./scripts/secret/decrypt.secret.script.ts \
  --encFile ./src/secret/storage/secrets.prod.json \
  --plainFile ./src/secret/storage/secrets.prod.plain.json \
  --key SECRET

Decrypts from encFile to plainFile

*/

require('dotenv').config({ path: process.cwd() + '/.env' })
import { objectUtil, StringMap } from '@naturalcycles/js-lib'
import { securityService } from '@src/srv/security.service'
import * as fs from 'fs-extra'
import * as yargs from 'yargs'

const { argv } = yargs
  .string(['plainFile', 'encFile', 'key'])
  .demandOption(['plainFile', 'encFile', 'key'])
const { plainFile, encFile, key } = argv

const main = async () => {
  const encSecrets: StringMap = await fs.readJSON(encFile)

  const plainSecrets = objectUtil.transformValues(encSecrets, (_k, v) =>
    securityService.decryptString(v, key),
  )
  // console.log(secrets)
  await fs.writeJSON(plainFile, plainSecrets, { spaces: 2 })
  console.log(`Decrypted to ${plainFile}`)
}

void main()
