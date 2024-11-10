import type { SFCScriptBlock } from '@vue/compiler-sfc'
import type { RuleSetType } from './rules/rules'
import type { AnalyzeParams } from './types'
import type { AnalyzeOutput } from './types/AnalyzeOutput'
import type { OverrideConfig } from './types/Override'
import fs from 'node:fs/promises'
import path from 'node:path'
import { parse } from '@vue/compiler-sfc'
import { minimatch } from 'minimatch'
import { setHasServer, setIsNuxt } from './context'
import { calculateCodeHealth } from './helpers/calculateCodeHealth'
import { FLAT_RULES } from './helpers/constants'
import { getConfig } from './helpers/getConfig'
import getProjectRoot from './helpers/getProjectRoot'
import { groupRulesByRuleset } from './helpers/groupRulesByRuleset'
import hasServerDir from './helpers/hasServerDir'
import { isNuxtProject, isVueProject } from './helpers/projectTypeChecker'
import { checkFileIgnoreRules } from './helpers/setupFileIgnoreList'
import { RULESETS } from './rules/rules'
import { checkRules } from './rulesCheck'
import { reportRules } from './rulesReport'

let filesCount = 0
let linesCount = 0
let _apply: string[] = []
let _override: OverrideConfig = {} as OverrideConfig
let _fileIgnoreRules: { [key: string]: string } = {}

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

    const apply = checkFileIgnoreRules(filePath, _fileIgnoreRules, _apply)

    checkRules(descriptor, filePath, apply, _override)
    return `Analyzing ${filePath}...`
  }
}

// Recursive function to walk through directories
const walkAsync = async (dir: string) => {
  const overviewMessages: string[] = []
  const file = await fs.stat(dir)

  if (!file.isDirectory()) {
    const info = await checkFile(dir, dir)
    if (info) {
      overviewMessages.push(info)
    }
    return overviewMessages
  }

  const files = await fs.readdir(dir)
  for (const fileName of files) {
    const filePath = path.join(dir, fileName)
    const stats = await fs.stat(filePath)
    if (stats.isDirectory()) {
      if (!skipDirs.some(dir => filePath.includes(dir)) && !excludeFiles.some(pattern => minimatch(filePath, pattern))) {
        const subDirInfo = await walkAsync(filePath)
        if (subDirInfo) {
          overviewMessages.push(...subDirInfo)
        }
      }
    }

    const info = await checkFile(filePath, filePath)
    if (info) {
      overviewMessages.push(info)
    }
  }
  return overviewMessages
}

export const analyze = async ({ dir, apply = [], ignore = [], exclude = '', groupBy = 'rule', level = 'all', sortBy = 'desc', fileIgnoreRules = {} }: AnalyzeParams): Promise<AnalyzeOutput> => {
  filesCount = 0
  linesCount = 0
  const projectRoot = await getProjectRoot(dir)
  const config = await getConfig(projectRoot)

  // Use config values if not provided in cli params
  // TODO add support for merging cli and config
  apply = apply.length ? apply : config.apply.split(',')
  ignore = ignore.length ? ignore : config.ignore ? config.ignore.split(',') : []
  exclude = exclude || config.exclude
  groupBy = groupBy || config.group
  level = level || config.level
  sortBy = sortBy || config.sort
  _fileIgnoreRules = { ...config.fileIgnoreRules, ...fileIgnoreRules }

  _override = config.override

  apply = apply.filter(rule => !ignore.includes(rule))
  const { rulesets, individualRules } = groupRulesByRuleset(apply)

  const rulesetsInIgnore = ignore.filter(rule => RULESETS.includes(rule as RuleSetType))
  const rulesInIgnore = ignore.filter(rule => FLAT_RULES.includes(rule))
  const ignoredRulesets = [...new Set([...rulesetsInIgnore, ...RULESETS.filter(ruleset => !rulesets.includes(ruleset))])]
  const ignoredRules = [...new Set([...rulesInIgnore, ...FLAT_RULES.filter(rule => !individualRules.includes(rule))])]

  const appliedRulesets = rulesets.filter(ruleset => !ignoredRulesets.includes(ruleset as RuleSetType))
  const appliedRules = individualRules.filter(rule => !ignoredRules.includes(rule))
  _apply = appliedRules

  // Prepare output messages for applied rulesets and rules
  const appliedRulesetsOutput = appliedRulesets.length ? `<bg_info>${appliedRulesets.join(', ')}</bg_info>` : 'N/A'
  const appliedRulesOutput = appliedRules.length ? `<bg_info>${appliedRules.join(', ')}</bg_info>` : 'N/A'

  // Prepare output message for ignored rulesets
  const ignoreRulesetsOutput = ignoredRulesets.length ? `<bg_info>${ignoredRulesets.join(', ')}</bg_info>` : 'N/A'
  const ignoredRulesOutput = ignoredRules.length ? `<bg_info>${ignoredRules.join(', ')}</bg_info>` : 'N/A'

  const isVue = await isVueProject(projectRoot)
  const isNuxt = await isNuxtProject(projectRoot)
  setIsNuxt(isNuxt)

  const hasServer = hasServerDir(projectRoot)
  setHasServer(hasServer)

  let applyingMessage = `      Applying ${appliedRulesets.length} rulesets: ${appliedRulesetsOutput}`
  if (individualRules.length > 0) {
    applyingMessage += `\n      Applying ${appliedRules.length} individual rules: ${appliedRulesOutput}`
  }

  const output: { info: string }[] = []

  output.push({ info: `<bg_info>Analyzing Vue, TS and JS files in ${dir}</bg_info>` })

  const configMessage = config.isDefault ? `👉 Using <bg_info>default</bg_info> configuration` : `👉 Using configuration from <bg_info>vue-mess-detector.json</bg_info>`
  output.push({ info: configMessage })

  output.push({ info: `      Project type: <bg_info>${isNuxt ? 'Nuxt' : ''}${isVue ? 'Vue' : ''}${!isNuxt && !isVue ? '?' : ''}</bg_info>` })
  output.push({
    info: `${applyingMessage}
      Ignoring ${ignoredRulesets.length} rulesets: ${ignoreRulesetsOutput}
      Ignoring ${ignoredRules.length} individual rules: ${ignoredRulesOutput}
      Ignoring file-specific rules: ${Object.entries(_fileIgnoreRules).map(([file, rules]) => `${file}: ${rules}`).join(', ')}
      Excluding ${exclude || '-'}
      Output level <bg_info>${level}</bg_info>
      Grouping by <bg_info>${groupBy}</bg_info>
      Sorting <bg_info>${sortBy}</bg_info>`,
  })

  if (exclude) {
    excludeFiles.push(...exclude.split(',').map(pattern => pattern.trim()))
  }

  // walk through the directory and check the files
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
