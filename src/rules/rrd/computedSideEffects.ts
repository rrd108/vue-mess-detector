import type { SFCScriptBlock } from '@vue/compiler-sfc'

import type { FileCheckResult, Offense } from '../../types'
import getLineNumber from '../getLineNumber'

const results: FileCheckResult[] = []

const resetResults = () => (results.length = 0)

const computedStartRegex = /computed\s*\(\s*\(\s*\)\s*=>\s*\{/g
const mutatingMethodRegex = /\.\s*(?:set|push|pop|shift|unshift|splice|reverse|sort)\s*\(/i
const memberMutationRegex = /(?:\+\+|--)\s*[a-z_$][\w$]*(?:\s*\.\s*[a-z_$][\w$]*|\s*\[[^\]]+\])+|[a-z_$][\w$]*(?:\s*\.\s*[a-z_$][\w$]*|\s*\[[^\]]+\])+\s*(?:\+\+|--|(?:\*\*|&&|\|\||\?\?|<<|>>>|>>|[+\-*/%&|^])=|=(?![=>]))/i
const bareMutationRegex = /(?<![.\w$])(?:(?:\+\+|--)\s*([a-z_$][\w$]*)|([a-z_$][\w$]*)\s*(?:\+\+|--|(?:\*\*|&&|\|\||\?\?|<<|>>>|>>|[+\-*/%&|^])=|=(?![=>])))(?![\w$]|\s*\.|\s*\[)/gi

const BINDING_KEYWORDS = new Set([
  'const',
  'let',
  'var',
  'of',
  'in',
  'as',
  'from',
  'true',
  'false',
  'null',
  'undefined',
  'typeof',
  'void',
  'new',
  'await',
  'async',
  'function',
  'class',
  'return',
  'if',
  'else',
  'for',
  'while',
  'do',
  'switch',
  'case',
  'break',
  'continue',
  'default',
  'this',
  'type',
  'interface',
  'number',
  'string',
  'boolean',
  'any',
  'unknown',
  'never',
  'object',
  'symbol',
  'bigint',
  'keyof',
  'readonly',
  'satisfies',
])

const findMatchingBrace = (source: string, openIdx: number): number => {
  let depth = 0
  let i = openIdx

  while (i < source.length) {
    const char = source[i]
    const next = source[i + 1]

    if (char === '/' && next === '/') {
      i += 2
      while (i < source.length && source[i] !== '\n') {
        i++
      }
      continue
    }

    if (char === '/' && next === '*') {
      i += 2
      while (i + 1 < source.length && !(source[i] === '*' && source[i + 1] === '/')) {
        i++
      }
      i += 2
      continue
    }

    if (char === '\'' || char === '"') {
      const quote = char
      i++
      while (i < source.length && source[i] !== quote) {
        if (source[i] === '\\') {
          i++
        }
        i++
      }
      i++
      continue
    }

    if (char === '`') {
      i++
      while (i < source.length && source[i] !== '`') {
        if (source[i] === '\\') {
          i += 2
          continue
        }
        if (source[i] === '$' && source[i + 1] === '{') {
          i += 2
          const end = findMatchingBrace(source, i - 1)
          i = end === -1 ? source.length : end + 1
          continue
        }
        i++
      }
      i++
      continue
    }

    if (char === '{') {
      depth++
    }
    else if (char === '}') {
      depth--
      if (depth === 0) {
        return i
      }
    }
    i++
  }

  return -1
}

const maskCommentsAndStrings = (source: string): string => {
  const out = source.split('')
  let i = 0

  const maskRange = (from: number, to: number) => {
    for (let j = from; j < to && j < out.length; j++) {
      if (out[j] !== '\n') {
        out[j] = ' '
      }
    }
  }

  while (i < source.length) {
    const char = source[i]
    const next = source[i + 1]

    if (char === '/' && next === '/') {
      const start = i
      i += 2
      while (i < source.length && source[i] !== '\n') {
        i++
      }
      maskRange(start, i)
      continue
    }

    if (char === '/' && next === '*') {
      const start = i
      i += 2
      while (i + 1 < source.length && !(source[i] === '*' && source[i + 1] === '/')) {
        i++
      }
      i = Math.min(i + 2, source.length)
      maskRange(start, i)
      continue
    }

    if (char === '\'' || char === '"') {
      const start = i
      const quote = char
      i++
      while (i < source.length && source[i] !== quote) {
        if (source[i] === '\\') {
          i++
        }
        i++
      }
      i++
      maskRange(start, i)
      continue
    }

    if (char === '`') {
      let start = i
      i++
      while (i < source.length && source[i] !== '`') {
        if (source[i] === '\\') {
          i += 2
          continue
        }
        if (source[i] === '$' && source[i + 1] === '{') {
          maskRange(start, i)
          i += 2
          const end = findMatchingBrace(source, i - 1)
          if (end === -1) {
            maskRange(i, source.length)
            return out.join('')
          }
          const inner = maskCommentsAndStrings(source.slice(i, end))
          for (let j = 0; j < inner.length; j++) {
            out[i + j] = inner[j]
          }
          i = end + 1
          start = i
          continue
        }
        i++
      }
      i++
      maskRange(start, i)
      continue
    }

    i++
  }

  return out.join('')
}

const readBindingList = (after: string): string => {
  let i = 0
  let depth = 0

  while (i < after.length) {
    const char = after[i]

    if (char === '{' || char === '[' || char === '(') {
      depth++
    }
    else if (char === '}' || char === ']' || char === ')') {
      if (depth === 0) {
        break
      }
      depth--
    }
    else if (depth === 0) {
      if (/\s/.test(char) && /^\s+(?:of|in)\b/.test(after.slice(i))) {
        break
      }
      if (char === '=' && after[i + 1] !== '=' && after[i + 1] !== '>') {
        break
      }
      if (char === ';' || char === '\n') {
        break
      }
    }
    i++
  }

  return after.slice(0, i)
}

const collectLocals = (body: string): Set<string> => {
  const locals = new Set<string>()
  const declRegex = /\b(?:const|let|var)\b/g
  let match = declRegex.exec(body)

  while (match) {
    const binding = readBindingList(body.slice(match.index + match[0].length))
    for (const ident of binding.matchAll(/[a-z_$][\w$]*/gi)) {
      if (!BINDING_KEYWORDS.has(ident[0])) {
        locals.add(ident[0])
      }
    }
    match = declRegex.exec(body)
  }

  return locals
}

const hasSideEffect = (body: string): boolean => {
  const masked = maskCommentsAndStrings(body)

  if (mutatingMethodRegex.test(masked) || memberMutationRegex.test(masked)) {
    return true
  }

  const locals = collectLocals(masked)
  bareMutationRegex.lastIndex = 0
  for (const match of masked.matchAll(bareMutationRegex)) {
    const name = match[1] || match[2]
    if (name && !locals.has(name)) {
      return true
    }
  }

  return false
}

const extractComputedBlocks = (content: string): { body: string, fullMatch: string }[] => {
  const blocks: { body: string, fullMatch: string }[] = []
  let match = computedStartRegex.exec(content)

  while (match) {
    const openIdx = match.index + match[0].length - 1
    const closeIdx = findMatchingBrace(content, openIdx)

    if (closeIdx !== -1) {
      let fullEnd = closeIdx + 1
      const closing = content.slice(fullEnd).match(/^\s*\)/)
      if (closing) {
        fullEnd += closing[0].length
      }

      blocks.push({
        body: content.slice(openIdx + 1, closeIdx),
        fullMatch: content.slice(match.index, fullEnd),
      })
    }

    match = computedStartRegex.exec(content)
  }

  computedStartRegex.lastIndex = 0
  return blocks
}

const checkComputedSideEffects = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }

  const blocks = extractComputedBlocks(script.content)

  blocks.forEach((block) => {
    if (hasSideEffect(block.body)) {
      const lineNumber = getLineNumber(script.content.trim(), block.fullMatch)
      const trimmedBody = block.body.trim()
      const truncatedBody = trimmedBody.length > 20 ? trimmedBody.slice(0, 20) : trimmedBody
      results.push({
        filePath,
        message: `line #${lineNumber} side effect detected in computed property <bg_err>(${truncatedBody})</bg_err>`,
      })
    }
  })
}

const reportComputedSideEffects = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>rrd ~ computed side effects</text_info>`,
        description: `👉 <text_warn>Avoid side effects in computed properties. Computed properties should only derive and return a value.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/computed-side-effects.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  resetResults()

  return offenses
}

export { checkComputedSideEffects, reportComputedSideEffects }
