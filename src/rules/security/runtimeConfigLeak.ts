import type { SFCDescriptor } from '@vue/compiler-sfc'
import type { FileCheckResult, Offense } from '../../types'

const results: FileCheckResult[] = []

const resetResults = () => (results.length = 0)

// Keys that are commonly sensitive and should never be exposed to the client
const SENSITIVE_KEY_PATTERNS = [
  'apikey',
  'api_key',
  'secret',
  'password',
  'passwd',
  'token',
  'privatekey',
  'private_key',
  'accesstoken',
  'access_token',
  'refreshtoken',
  'refresh_token',
  'clientsecret',
  'client_secret',
  'databaseurl',
  'database_url',
  'dburl',
  'db_url',
  'connectionstring',
  'connection_string',
  'auth',
  'credentials',
  'private',
]

const isSensitiveKey = (key: string) => {
  const lower = key.toLowerCase()
  return SENSITIVE_KEY_PATTERNS.some(pattern => lower.includes(pattern))
}

/**
 * Extracts the content between the first matching pair of braces.
 * `source[start]` must be '{'.
 */
const extractBraceBlock = (source: string, start: number): string | null => {
  if (source[start] !== '{') {
    return null
  }

  let depth = 0
  for (let i = start; i < source.length; i++) {
    if (source[i] === '{') {
      depth++
    }
    else if (source[i] === '}') {
      depth--
      if (depth === 0) {
        return source.slice(start + 1, i)
      }
    }
  }

  return null
}

/**
 * Extracts keys from the `public` block of `runtimeConfig` in nuxt.config content.
 * Uses a simple brace-matching approach to find `public: { ... }` inside `runtimeConfig`.
 */
const extractPublicKeys = (source: string): string[] => {
  const keys: string[] = []

  // Find runtimeConfig block
  const rcMatch = source.match(/runtimeConfig\s*:\s*\{/)
  if (!rcMatch || rcMatch.index === undefined) {
    return keys
  }

  const rcStart = rcMatch.index + rcMatch[0].length
  const rcBlock = extractBraceBlock(source, rcStart - 1)
  if (!rcBlock) {
    return keys
  }

  // Find public block inside runtimeConfig
  const pubMatch = rcBlock.match(/public\s*:\s*\{/)
  if (!pubMatch || pubMatch.index === undefined) {
    return keys
  }

  const pubStart = pubMatch.index + pubMatch[0].length
  const pubBlock = extractBraceBlock(rcBlock, pubStart - 1)
  if (!pubBlock) {
    return keys
  }

  // Extract key names from the public block
  // Matches patterns like:  apiKey: '...'  or  apiKey: process.env.X  or  "apiKey": {...}
  const keyRegex = /["']?([\w$]+)["']?\s*:/g
  const matches = pubBlock.matchAll(keyRegex)
  for (const match of matches) {
    keys.push(match[1])
  }

  return keys
}

const checkRuntimeConfigLeak = (descriptor: SFCDescriptor, filePath: string) => {
  const isNuxtConfig = filePath.endsWith('nuxt.config.ts') || filePath.endsWith('nuxt.config.js') || filePath.endsWith('nuxt.config.mjs')
  const isVueFile = filePath.endsWith('.vue')
  const isClientTsJs = (filePath.endsWith('.ts') || filePath.endsWith('.js')) && !filePath.includes('/server/')

  // Case 1: Check nuxt.config for sensitive keys in runtimeConfig.public
  if (isNuxtConfig) {
    const source = descriptor.source || descriptor.script?.content || ''
    const publicKeys = extractPublicKeys(source)
    const leakedKeys = publicKeys.filter(isSensitiveKey)

    if (leakedKeys.length > 0) {
      results.push({
        filePath,
        message: `Sensitive keys in <bg_err>runtimeConfig.public</bg_err>: ${leakedKeys.join(', ')}`,
      })
    }
  }

  // Case 2: Check Vue/TS/JS client-side files for accessing private runtimeConfig
  if (isVueFile || isClientTsJs) {
    const script = descriptor.scriptSetup || descriptor.script
    const content = script?.content || descriptor.source || ''

    // Pattern 1: Direct access — useRuntimeConfig().something (not .public)
    // e.g. const token = useRuntimeConfig().secretToken
    const directAccessPattern = /useRuntimeConfig\s*\(\s*\)\s*\.\s*(?!public\b)\w+/
    if (directAccessPattern.test(content)) {
      results.push({
        filePath,
        message: `Accessing <bg_err>private runtimeConfig</bg_err> on client side — use <bg_ok>runtimeConfig.public</bg_ok> for client-exposed values`,
      })
    }
    else {
      // Pattern 2: Variable-based access — const config = useRuntimeConfig(); config.something (not .public)
      // Find the variable name assigned to useRuntimeConfig()
      const varMatch = content.match(/(?:const|let|var)\s+([\w$]+)\s*=\s*useRuntimeConfig\s*\(\s*\)/)
      if (varMatch) {
        const varName = varMatch[1]
        // Check if that variable is accessed without .public
        // Matches: config.apiKey  or  config['apiKey']  but not  config.public.apiKey
        const varAccessPattern = new RegExp(`${varName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\.\\s*(?!public\\b)['"]?\\w+['"]?`)
        if (varAccessPattern.test(content)) {
          results.push({
            filePath,
            message: `Accessing <bg_err>private runtimeConfig</bg_err> on client side — use <bg_ok>runtimeConfig.public</bg_ok> for client-exposed values`,
          })
        }
      }
    }
  }
}

const reportRuntimeConfigLeak = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>security ~ runtimeConfig leak</text_info>`,
        description: `👉 <text_warn>Sensitive data should never be placed in runtimeConfig.public or accessed on the client side without .public.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/security/runtime-config-leak.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  resetResults()

  return offenses
}

export { checkRuntimeConfigLeak, reportRuntimeConfigLeak }
