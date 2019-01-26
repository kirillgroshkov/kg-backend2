/*

yarn tsn ./scripts/prepareDeploy.ts --targetDir ./build/deploy

 */

import { projectDir } from '@src/cnst/paths.cnst'
import * as cpy from 'cpy'
import * as del from 'del'
import * as yargs from 'yargs'

const { argv } = yargs.string('targetDir').default({
  targetDir: projectDir + '/build/deploy',
})

const { targetDir } = argv

const FILES = [
  'dist',
  'src', // Sentry needs it, because sourcemaps point to source files (../src/...)
  '!src/test',
  '!src/**/*.test.*',
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

  console.log(`prepareDeploy.ts done: ${targetDir}`)
}
