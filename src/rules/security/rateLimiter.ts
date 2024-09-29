import type { SFCDescriptor } from '@vue/compiler-sfc'
import type { FileCheckResult, Offense } from '../../types'

const results: FileCheckResult[] = []

const resetResults = () => (results.length = 0)

const recognizedRateLimiters = ['nuxt-api-shield', 'nuxt-security']

const checkRateLimiter = async (descriptor: SFCDescriptor | null, filePath: string) => {
  if (!descriptor || filePath != 'package.json') {
    return
  }

  if (recognizedRateLimiters.some(limiter => descriptor.source.includes(limiter))) {
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
