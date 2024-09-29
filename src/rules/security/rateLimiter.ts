import type { SFCDescriptor } from '@vue/compiler-sfc'
import type { FileCheckResult, Offense } from '../../types'
import fs from 'node:fs'
import path from 'node:path'
import getProjectRoot from '../../helpers/getProjectRoot'

const results: FileCheckResult[] = []

const resetResults = () => (results.length = 0)

const getServerDir = async (filePath: string) => {
  const root = await getProjectRoot(filePath)
  const serverDir = path.join(root, 'server')
  return fs.existsSync(serverDir) ? serverDir : false
}

const checkRateLimiter = async (descriptor: SFCDescriptor | null, filePath: string) => {
  if (!descriptor || filePath != 'package.json') {
    return
  }

  const serverDir = await getServerDir(filePath)
  if (!serverDir) {
    return
  }

  if (descriptor.source.includes('nuxt-api-shield')) {
    return
  }

  results.push({
    filePath,
    message: `<bg_warn>No rate limiter detected</bg_warn>`,
  })
}

const reportRateLimiter = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>security ~ rate Limiter</text_info>`,
        description: `👉 <text_warn>Use a rate limiter, like nuxt-api-shield or nuxt-security.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/security/rate-limiter.html`,
        message: `${result.message} 🚨`,
      })
    })
  }

  resetResults()

  return offenses
}

export { checkRateLimiter, reportRateLimiter }
