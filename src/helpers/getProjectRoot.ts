import path from 'node:path'
import fs from 'node:fs/promises'

const getProjectRoot = async () => {
  let currentDir = process.cwd()

  while (currentDir !== path.parse(currentDir).root) {
    // Check if package.json exists in the current directory
    const packageJsonPath = path.join(currentDir, 'package.json')
    await fs.access(packageJsonPath)
    return currentDir
  }

  // Move up one directory level
  currentDir = path.dirname(currentDir)
}

export default getProjectRoot
