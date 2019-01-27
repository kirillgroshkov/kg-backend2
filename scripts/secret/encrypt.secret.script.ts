/*

yarn tsn ./scripts/secret/encrypt.secret.script.ts \
  --plainFile ./src/secret/storage/secrets.prod.plain.json \
  --encFile ./src/secret/storage/secrets.prod.json \
  --key SECRET

Encrypts from plainFile to encFile

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
  const plainSecrets: StringMap = await fs.readJSON(plainFile)
  // console.log(plainSecrets)

  const secrets = objectUtil.transformValues(plainSecrets, (_k, v) =>
    securityService.encryptString(v, key),
  )
  // console.log(secrets)
  await fs.writeJSON(encFile, secrets, { spaces: 2 })
  console.log(`Encrypted to ${encFile}`)
}

void main()
