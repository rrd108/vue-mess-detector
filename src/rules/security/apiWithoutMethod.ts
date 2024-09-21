import type { SFCDescriptor } from '@vue/compiler-sfc'
import type { FileCheckResult, Offense } from '../../types'
import { createRegExp, exactly, oneOrMore } from 'magic-regexp'

const results: FileCheckResult[] = []

const HTTP_METHODS = ['get', 'post', 'put', 'delete', 'patch', 'options', 'head']

const resetResults = () => (results.length = 0)

const checkApiWithoutMethod = (descriptor: SFCDescriptor, filePath: string) => {
  if (!filePath.includes('/server/api/')) {
    return
  }

  const fileNameWithoutExt = filePath.replace(/\.[^/.]+$/, '')

  // Check if the file name has a valid HTTP method postfix
  const hasMethodPostfix = HTTP_METHODS.some(method => fileNameWithoutExt.toLowerCase().endsWith(`.${method}`))

  if (hasMethodPostfix) {
    return
  }

  // If no method postfix, check file content for method check
  const content = descriptor.source
  const methodCheckRegex = createRegExp(
    exactly('if'),
    oneOrMore(' '),
    '(',
    exactly('event.node.req.method'),
    oneOrMore(' '),
    '!=',
  )

  if (!methodCheckRegex.test(content)) {
    results.push({
      filePath,
      message: `API route <bg_warn>without HTTP method</bg_warn> specified in filename or content`,
    })
  }
}

const reportApiWithoutMethod = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      const filename = result.filePath.split('/').pop()?.replace(/\.[^/.]+$/, '')
      offenses.push({
        file: result.filePath,
        rule: `<text_info>rrd ~ API endpoint without HTTP method</text_info>`,
        description: `👉 <text_warn>Specify the HTTP method in the filename (e.g., ${filename}.post.ts) or include a method check in the file content.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/api-without-method.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  resetResults()

  return offenses
}

export { checkApiWithoutMethod, reportApiWithoutMethod }
