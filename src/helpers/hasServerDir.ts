import fs from 'node:fs'
import path from 'node:path'

const hasServerDir = (projectRoot: string) => {
  const serverDir = path.join(projectRoot, 'server')
  return fs.existsSync(serverDir)
}

export default hasServerDir
