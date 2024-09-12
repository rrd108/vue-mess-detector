import type { PackageJson } from '../types/PackageJson'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const getPackageJson = async (projectRoot?: string): Promise<PackageJson> => {
  let packageJsonPath = ''
  if (!projectRoot) {
    const filePath = fileURLToPath(import.meta.url)
    const dirname = path.dirname(filePath)
    const toolRoot = path.resolve(dirname, '..')
    packageJsonPath = path.join(toolRoot, 'package.json')
  }
  if (projectRoot) {
    packageJsonPath = path.join(projectRoot, 'package.json')
  }
  const packageJson: PackageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'))
  return packageJson
}
