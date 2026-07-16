import type { SFCDescriptor } from '@vue/compiler-sfc'
import type { FileCheckResult, Offense } from '../../types'

const results: FileCheckResult[] = []

const resetResults = () => (results.length = 0)

const HSTS_PATTERNS = [
  'Strict-Transport-Security',
  'strict-transport-security',
  'strictTransportSecurity',
]

const checkStrictTransportSecurity = (descriptor: SFCDescriptor, filePath: string) => {
  if (!filePath.includes('nuxt.config')) {
    return
  }

  const content = descriptor.source

  const hasHSTS = HSTS_PATTERNS.some(pattern => content.includes(pattern))

  if (hasHSTS) {
    return
  }

  results.push({
    filePath,
    message: `<bg_warn>No Strict-Transport-Security (HSTS) header configured</bg_warn>`,
  })
}

const reportStrictTransportSecurity = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>security ~ Strict-Transport-Security (HSTS)</text_info>`,
        description: `👉 <text_warn>Add the Strict-Transport-Security header to nuxt.config, or use nuxt-security to enable HSTS protection against downgrade attacks and cookie hijacking.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/security/strict-transport-security.html`,
        message: `${result.message} 🚨`,
      })
    })
  }

  resetResults()

  return offenses
}

export { checkStrictTransportSecurity, reportStrictTransportSecurity }
