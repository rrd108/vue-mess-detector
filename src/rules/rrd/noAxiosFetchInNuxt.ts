import type { SFCScriptBlock } from '@vue/compiler-sfc'
import type { FileCheckResult, Offense } from '../../types'
import getLineNumber from '../getLineNumber'

const results: FileCheckResult[] = []

const resetResults = () => (results.length = 0)

const checkNoAxiosFetchInNuxt = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }

  const content = script.content
  const trimmed = content.trim()

  // Collect all matches with their positions for ordered processing
  // Match 'axios.' (method calls like axios.get, axios.post) — avoids import statements
  // Match 'fetch(' (function calls), excluding $fetch (Nuxt's built-in)
  interface Match { display: string, search: string, index: number }
  const allMatches: Match[] = []

  const axiosRegex = /\baxios\./g
  let m: RegExpExecArray | null
  // eslint-disable-next-line no-cond-assign
  while ((m = axiosRegex.exec(content)) !== null) {
    allMatches.push({ display: 'axios', search: 'axios.', index: m.index })
  }

  const fetchRegex = /\bfetch\(/g
  // eslint-disable-next-line no-cond-assign
  while ((m = fetchRegex.exec(content)) !== null) {
    const idx = m.index
    // Skip $fetch — Nuxt's built-in composable
    if (idx > 0 && content[idx - 1] === '$') {
      continue
    }
    allMatches.push({ display: 'fetch', search: 'fetch(', index: idx })
  }

  // Sort by position in file for correct ordering
  allMatches.sort((a, b) => a.index - b.index)

  // Process in order, using `from` to get correct line numbers for duplicates
  let lastLine = 0
  for (const match of allMatches) {
    const lineNumber = getLineNumber(trimmed, match.search, lastLine)
    lastLine = lineNumber
    results.push({
      filePath,
      message: `line #${lineNumber} <bg_warn>Direct HTTP call detected: ${match.display}</bg_warn>`,
    })
  }
}

const reportNoAxiosFetchInNuxt = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>rrd ~ no axios or fetch in nuxt</text_info>`,
        description: `👉 <text_warn>Avoid using axios or fetch directly in Nuxt. Use useFetch, useAsyncData, or $fetch instead for proper SSR and data handling.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-axios-fetch-in-nuxt.html`,
        message: `${result.message} 🚨`,
      })
    })
  }

  resetResults()

  return offenses
}

export { checkNoAxiosFetchInNuxt, reportNoAxiosFetchInNuxt }
