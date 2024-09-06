import fs from 'node:fs/promises'
import path from 'node:path'

const getProjectRoot = async (startDir: string) => {
  let currentDir = startDir

  while (currentDir !== path.parse(currentDir).root) {
    // Check if package.json exists in the current directory
    const packageJsonPath = path.join(currentDir, 'package.json')
    try {
      await fs.access(packageJsonPath)
      return currentDir
    }
    catch {
      // File doesn't exist, move up one directory level
      currentDir = path.dirname(currentDir)
    }
  }

  throw new Error('Project root not found')
}

export default getProjectRoot
