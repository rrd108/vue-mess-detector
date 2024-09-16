import fs from 'node:fs/promises'
import path from 'node:path'
import { parse } from '@vue/compiler-sfc'
import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { setIsNuxt } from './context'
import { calculateCodeHealth } from './helpers/calculateCodeHealth'
import getProjectRoot from './helpers/getProjectRoot'
import { groupRulesByRuleset } from './helpers/groupRulesByRuleset'
import { isNuxtProject, isVueProject } from './helpers/projectTypeChecker'
import { checkRules } from './rulesCheck'
import { reportRules } from './rulesReport'
import type { RuleSetType } from './rules/rules'
import type { AnalyzeParams } from './types'
import type { AnalyzeOutput } from './types/AnalyzeOutput'

let filesCount = 0
let linesCount = 0
let _apply: string[] = []

// Directories to skip during analysis
const skipDirs = ['cache', 'coverage', 'dist', '.git', 'node_modules', '.nuxt', '.output', 'vendor']
const excludeFiles: string[] = []

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
    checkRules(descriptor, filePath, _apply)
    return `Analyzing ${filePath}...`
  }
}

// Recursive function to walk through directories
const walkAsync = async (dir: string) => {
  const overwievMessages: string[] = []
  const file = await fs.stat(dir)

  if (!file.isDirectory()) {
    const info = await checkFile(dir, dir)
    if (info) {
      overwievMessages.push(info)
    }
    return overwievMessages
  }

  const files = await fs.readdir(dir)
  for (const fileName of files) {
    const filePath = path.join(dir, fileName)
    const stats = await fs.stat(filePath)
    if (stats.isDirectory()) {
      if (!skipDirs.some(dir => filePath.includes(dir)) && !excludeFiles.some(dir => filePath.endsWith(dir))) {
        const subDirInfo = await walkAsync(filePath)
        if (subDirInfo) {
          overwievMessages.push(...subDirInfo)
        }
      }
    }

    const info = await checkFile(filePath, filePath)
    if (info) {
      overwievMessages.push(info)
    }
  }
  return overwievMessages
}

export const analyze = async ({ dir, apply = [], ignore = [], exclude, groupBy, level, sortBy }: AnalyzeParams): Promise<AnalyzeOutput> => {
  const appliedRules = apply.filter(rule => !ignore.includes(rule))

  const { rulesets, individualRules } = groupRulesByRuleset(appliedRules)

  // Prepare output messages for applied rulesets and rules
  const rulesetsOutput = rulesets.length ? `<bg_info>${rulesets.join(', ')}</bg_info>` : 'N/A'
  const indRulesOutput = individualRules.length ? `<bg_info>${individualRules.join(', ')}</bg_info>` : 'N/A'

  let applyingMessage = `      Applying ${rulesets.length} rulesets: ${rulesetsOutput}`
  if (individualRules.length > 0) {
    applyingMessage += `\n      Applying ${individualRules.length} individual rules: ${indRulesOutput}`
  }

  // Prepare output message for ignored rulesets
  const ignoredRulesets = ignore.filter(ruleset => !rulesets.includes(ruleset as RuleSetType))
  const ignoreRulesetsOutput = ignoredRulesets.length ? `<bg_info>${ignoredRulesets.join(', ')}</bg_info>` : 'N/A'

  const projectRoot = await getProjectRoot(dir)
  const isVue = await isVueProject(projectRoot)
  const isNuxt = await isNuxtProject(projectRoot)
  setIsNuxt(isNuxt)

  const output: { info: string }[] = []

  output.push({ info: `<bg_info>Analyzing Vue, TS and JS files in ${dir}</bg_info>` })
  output.push({ info: `      Project type: <bg_info>${isNuxt ? 'Nuxt' : ''}${isVue ? 'Vue' : ''}${!isNuxt && !isVue ? '?' : ''}</bg_info>` })
  output.push({
    info: `${applyingMessage}
      Ignoring ${ignoredRulesets.length} rules: ${ignoreRulesetsOutput}
      Excluding ${exclude || '-'}
      Output level <bg_info>${level}</bg_info>
      Grouping by <bg_info>${groupBy}</bg_info>
      Sorting <bg_info>${sortBy}</bg_info>`,
  })

  // Filter out ignored rules from the apply list
  _apply = apply.filter(rule => !ignore.includes(rule))

  if (exclude) {
    excludeFiles.push(...exclude.split(','))
  }

  const overview = await walkAsync(dir)
  output.push(...overview.map(info => ({ info })))

  output.push({ info: `Found <bg_info>${filesCount}</bg_info> files` })

  // Generate the report and calculate code health
  const { health, output: reportOutput } = reportRules(groupBy, sortBy, level)
  const { errors, warnings, output: codeHealthOutput } = calculateCodeHealth(health, linesCount, filesCount)

  if (!errors && !warnings) {
    output.push({ info: `\n<bg_ok>No code smells detected!</bg_ok>` })
  }

  return { output, codeHealthOutput, reportOutput }
}
