import type { SFCScriptBlock } from '@vue/compiler-sfc'

import type { FileCheckResult, Offense } from '../../types'

const results: FileCheckResult[] = []

const resetResults = () => (results.length = 0)

/**
 * Check that a composable's file name matches the name of the function it exports.
 *
 * Composables are files that export a function whose name starts with `use`.
 * The file name (without extension) should match the exported function name.
 *
 * Example: `useCounter.ts` should export `useCounter`.
 */
const checkComposableFileName = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }

  const fileName = filePath.split('/').pop() || filePath

  // Only check .ts and .js files (composables are not .vue)
  if (!fileName.endsWith('.ts') && !fileName.endsWith('.js')) {
    return
  }

  const baseName = fileName.replace(/\.(ts|js)$/, '')

  // Only check files whose name starts with "use" (composable convention)
  if (!baseName.startsWith('use')) {
    return
  }

  const content = script.content

  // Match exported function declarations: export function useFoo, export const useFoo =, export { useFoo }
  const exportFunctionRegex = /export\s+(?:default\s+)?function\s+([a-zA-Z_$][\w$]*)/g
  const exportConstRegex = /export\s+const\s+([a-zA-Z_$][\w$]*)\s*=/g
  const exportNamedRegex = /export\s*\{([^}]+)\}/g

  const exportedNames: string[] = []

  let match
  // eslint-disable-next-line no-cond-assign
  while ((match = exportFunctionRegex.exec(content)) !== null) {
    if (match[1].startsWith('use')) {
      exportedNames.push(match[1])
    }
  }
  // eslint-disable-next-line no-cond-assign
  while ((match = exportConstRegex.exec(content)) !== null) {
    if (match[1].startsWith('use')) {
      exportedNames.push(match[1])
    }
  }
  // eslint-disable-next-line no-cond-assign
  while ((match = exportNamedRegex.exec(content)) !== null) {
    const names = match[1].split(',').map(n => n.trim().split(/\s+as\s+/)[0].trim())
    for (const name of names) {
      if (name.startsWith('use')) {
        exportedNames.push(name)
      }
    }
  }

  // If no exported use* function found, skip
  if (exportedNames.length === 0) {
    return
  }

  // Check if any exported name matches the file name
  const hasMatch = exportedNames.includes(baseName)

  if (!hasMatch) {
    results.push({
      filePath,
      message: `file: <bg_warn>(${fileName})</bg_warn> exports <bg_warn>(${exportedNames.join(', ')})</bg_warn>`,
    })
  }
}

const reportComposableFileName = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>rrd ~ composable file name</text_info>`,
        description: `👉 <text_warn>Composable file name should match the exported function name.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/composable-file-name.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  resetResults()

  return offenses
}

export { checkComposableFileName, reportComposableFileName }
