/*

yarn tsn ./scripts/prepareDeploy.ts --targetDir ./build/deploy

 */

// require('dotenv').config() // to debug locally
import { projectDir } from '@src/cnst/paths.cnst'
import * as cpy from 'cpy'
import * as del from 'del'
import * as fs from 'fs-extra'
import * as yargs from 'yargs'
const yamljs = require('yamljs')

const { argv } = yargs.string('targetDir').default({
  targetDir: projectDir + '/build/deploy',
})

const { targetDir } = argv

const FILES = [
  'dist',
  'src', // Sentry needs it, because sourcemaps point to source files (../src/...)
  '!src/test',
  '!src/**/*.test.*',
  '!src/**/*.mock.*',
  '!src/**/__snapshots__',
  'static',
  'package.json',
  'yarn.lock',
  'tsconfig.json', // for path-mapping to work!
  'tsconfig.dist.json',
  '.gcloudignore',
  'app.yaml',
]

void main()

async function main () {
  // Clean targetDir
  await del(targetDir)

  await cpy(FILES, targetDir, { parents: true })

  // Fix app.yaml
  const appYamlPath = `${targetDir}/app.yaml`
  let appYaml = yamljs.load(appYamlPath)
  appYaml = {
    ...appYaml,
    env_variables: {
      ...appYaml.env_variables,
      SECRETS_ENCRYPTION_KEY_PROD: process.env.SECRETS_ENCRYPTION_KEY_PROD,
    },
  }

  await fs.writeFile(appYamlPath, yamljs.stringify(appYaml))

  console.log(`prepareDeploy.ts done: ${targetDir}`)
}
