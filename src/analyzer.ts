import type { SFCScriptBlock } from '@vue/compiler-sfc'
import type { RuleSetType } from './rules/rules'
import type { AnalyzeParams } from './types'
import type { AnalyzeOutput } from './types/AnalyzeOutput'
import type { OverrideConfig } from './types/Override'
import fs from 'node:fs/promises'
import path from 'node:path'
import { parse } from '@vue/compiler-sfc'
import { minimatch } from 'minimatch'
import { setIsNuxt } from './context'
import { calculateCodeHealth } from './helpers/calculateCodeHealth'
import { getConfig } from './helpers/getConfig'
import getProjectRoot from './helpers/getProjectRoot'
import { groupRulesByRuleset } from './helpers/groupRulesByRuleset'
import { isNuxtProject, isVueProject } from './helpers/projectTypeChecker'
import { checkRules } from './rulesCheck'
import { reportRules } from './rulesReport'

let filesCount = 0
let linesCount = 0
let _apply: string[] = []
let _override: OverrideConfig = {} as OverrideConfig

// Directories to skip during analysis
const skipDirs = ['cache', 'coverage', 'dist', '.git', 'node_modules', '.nuxt', '.output', 'vendor']
const excludeFiles: string[] = []

const checkFile = async (fileName: string, filePath: string) => {
  if (excludeFiles.some(pattern => minimatch(filePath, pattern, { matchBase: true }))) {
    return
  }

  if (fileName.endsWith('.vue') || fileName.endsWith('.ts') || fileName.endsWith('.js') || fileName.endsWith('package.json')) {
    filesCount++
    const content = await fs.readFile(filePath, 'utf-8')
    linesCount += content.split(/\r\n|\r|\n/).length
    const { descriptor } = parse(content)

    if (fileName.endsWith('.ts') || fileName.endsWith('.js')) {
      descriptor.script = { content } as SFCScriptBlock
    }

    checkRules(descriptor, filePath, _apply, _override)
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
      if (!skipDirs.some(dir => filePath.includes(dir)) && !excludeFiles.some(pattern => minimatch(filePath, pattern))) {
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

export const analyze = async ({ dir, apply = [], ignore = [], exclude = '', groupBy = 'rule', level = 'all', sortBy = 'desc' }: AnalyzeParams): Promise<AnalyzeOutput> => {
  filesCount = 0
  linesCount = 0
  const projectRoot = await getProjectRoot(dir)
  const config = await getConfig(projectRoot)

  // Use config values if not provided in cli params
  apply = apply.length ? apply : config.apply.split(',')
  ignore = ignore.length ? ignore : config.ignore ? config.ignore.split(',') : []
  exclude = exclude || config.exclude
  groupBy = groupBy || config.group
  level = level || config.level
  sortBy = sortBy || config.sort

  _override = config.override

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

  const isVue = await isVueProject(projectRoot)
  const isNuxt = await isNuxtProject(projectRoot)
  setIsNuxt(isNuxt)

  const output: { info: string }[] = []

  output.push({ info: `<bg_info>Analyzing Vue, TS and JS files in ${dir}</bg_info>` })

  const configMessage = config.isDefault ? `👉 Using <bg_info>default</bg_info> configuration` : `👉 Using configuration from <bg_info>vue-mess-detector.json</bg_info>`
  output.push({ info: configMessage })

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
    excludeFiles.push(...exclude.split(',').map(pattern => pattern.trim()))
  }

  const overview = await walkAsync(dir)
  output.push(...overview.map(info => ({ info })))

  output.push({ info: `Found <bg_info>${filesCount}</bg_info> files` })

  // Generate the report and calculate code health
  const { health, output: reportOutput } = reportRules(groupBy, sortBy, level, config.override)
  const { codeHealth, output: codeHealthOutput } = calculateCodeHealth(health, linesCount, filesCount)

  if (!codeHealth.errors && !codeHealth.warnings) {
    output.push({ info: `\n<bg_ok>No code smells detected!</bg_ok>` })
  }

  return { output, codeHealthOutput, reportOutput, codeHealth }
}
