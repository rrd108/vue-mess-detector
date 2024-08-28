import fs from 'node:fs/promises'
import path from 'node:path'
import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { parse } from '@vue/compiler-sfc'
import { BG_INFO, BG_OK, BG_RESET } from './rules/asceeCodes'
import type { RuleSetType } from './rules/rules'
import { reportRules } from './rulesReport'
import { checkRules } from './rulesCheck'
import { calculateCodeHealth } from './helpers/calculateCodeHealth'
import { groupRulesByRuleset } from './helpers/groupRulesByRuleset'
import type { AnalyzeParams } from './types'

let filesCount = 0
let linesCount = 0
let _apply: string[] = []

// Directories to skip during analysis
const skipDirs = ['cache', 'coverage', 'dist', '.git', 'node_modules', '.nuxt', '.output', 'vendor']
const excludeFiles: string[] = []

const output: { info: string }[] = []

const checkFile = async (fileName: string, filePath: string) => {
  if (excludeFiles.some(file => fileName.endsWith(file))) {
    return
  }

  if (fileName.endsWith('.vue') || fileName.endsWith('.ts') || fileName.endsWith('.js')) {
    filesCount++
    const content = await fs.readFile(filePath, 'utf-8')
    linesCount += content.split(/\r\n|\r|\n/).length
    const { descriptor } = parse(content)

    if (fileName.endsWith('.ts') || fileName.endsWith('.js')) {
      descriptor.script = { content } as SFCScriptBlock
    }
    output.push({ info: `Analyzing ${filePath}...` })
    checkRules(descriptor, filePath, _apply)
  }
}

// Recursive function to walk through directories
const walkAsync = async (dir: string) => {
  const file = await fs.stat(dir)
  if (!file.isDirectory()) {
    await checkFile(dir, dir)
    return
  }

  const files = await fs.readdir(dir)
  for (const fileName of files) {
    const filePath = path.join(dir, fileName)
    const stats = await fs.stat(filePath)
    if (stats.isDirectory()) {
      if (!skipDirs.some(dir => filePath.includes(dir)) && !excludeFiles.some(dir => filePath.endsWith(dir))) {
        await walkAsync(filePath)
      }
    }

    await checkFile(filePath, filePath)
  }
}

export const analyze = async ({ dir, apply = [], ignore = [], exclude, groupBy, level, orderBy }: AnalyzeParams) => {
  const appliedRules = apply.filter(rule => !ignore.includes(rule))

  const { rulesets, individualRules } = groupRulesByRuleset(appliedRules)

  // Prepare output messages for applied rulesets and rules
  const rulesetsOutput = rulesets.length ? `${BG_INFO}${rulesets.join(', ')}${BG_RESET}` : 'N/A'
  const indRulesOutput = individualRules.length ? `${BG_INFO}${individualRules.join(', ')}${BG_RESET}` : 'N/A'

  let applyingMessage = `      Applying ${rulesets.length} rulesets: ${rulesetsOutput}`
  if (individualRules.length > 0) {
    applyingMessage += `\n      Applying ${individualRules.length} individual rules: ${indRulesOutput}`
  }

  // Prepare output message for ignored rulesets
  const ignoredRulesets = ignore.filter(ruleset => !rulesets.includes(ruleset as RuleSetType))
  const ignoreRulesetsOutput = ignoredRulesets.length ? `${BG_INFO}${ignoredRulesets.join(', ')}${BG_RESET}` : 'N/A'

  output.push({ info: `${BG_INFO}Analyzing Vue, TS and JS files in ${dir}${BG_RESET}` })
  output.push({
    info: `${applyingMessage}
      Ignoring ${ignoredRulesets.length} rules: ${ignoreRulesetsOutput}
      Excluding ${exclude || '-'}
      Output level ${BG_INFO}${level}${BG_RESET}
      Grouping by ${BG_INFO}${groupBy}${BG_RESET}
      Ordering ${BG_INFO}${orderBy}${BG_RESET}`,
  })

  // Filter out ignored rules from the apply list
  _apply = apply.filter(rule => !ignore.includes(rule))

  if (exclude) {
    excludeFiles.push(...exclude.split(','))
  }

  // Start analysis
  await walkAsync(dir)

  output.push({ info: `Found ${BG_INFO}${filesCount}${BG_RESET} files` })

  // Generate the report and calculate code health
  const { health, output: reportOutput } = reportRules(groupBy, orderBy, level)
  const { errors, warnings, output: codeHealthOutput } = calculateCodeHealth(health, linesCount, filesCount)

  if (!errors && !warnings) {
    output.push({ info: `\n${BG_OK}No code smells detected!${BG_RESET}` })
  }

  return { output, codeHealthOutput, reportOutput }
}
