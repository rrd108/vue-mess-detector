import type { SFCDescriptor } from '@vue/compiler-sfc'
import type { FileCheckResult, Offense } from '../../types'
import { createRegExp, exactly, global } from 'magic-regexp'
import getLineNumber from '../getLineNumber'

const results: FileCheckResult[] = []

const resetResults = () => (results.length = 0)

const checkVHtmlSanitization = (descriptor: SFCDescriptor, filePath: string) => {
  const script = descriptor.scriptSetup || descriptor.script
  const template = descriptor.template

  if (!template) {
    return
  }

  // Detect v-html directive usage in template
  const vHtmlRegex = createRegExp(exactly('v-html'), [global])
  const vHtmlMatches = template.content.match(vHtmlRegex)

  if (!vHtmlMatches?.length) {
    return
  }

  // Check if DOMPurifier or sanitize-html is imported/used in the script
  const scriptContent = script?.content || ''
  const hasSanitizer = ['DOMPurify', 'sanitize-html', 'dompurify', 'sanitizeHtml', 'xss']
    .some(sanitizer => scriptContent.includes(sanitizer))

  if (hasSanitizer) {
    return
  }

  // Report each v-html usage without sanitization
  let from = 0
  vHtmlMatches.forEach((match) => {
    const lineNumber = getLineNumber(template.content, match, from)
    results.push({
      filePath,
      message: `line #${lineNumber} <bg_warn>v-html without sanitization</bg_warn>`,
    })
    from = lineNumber
  })
}

const reportVHtmlSanitization = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>security ~ v-html without sanitization</text_info>`,
        description: `👉 <text_warn>Sanitize HTML before rendering with v-html to prevent XSS attacks. Use DOMPurify or sanitize-html.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/security/v-html-sanitization.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  resetResults()

  return offenses
}

export { checkVHtmlSanitization, reportVHtmlSanitization }
